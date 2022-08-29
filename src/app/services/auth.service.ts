import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { RecursiveEventCancel } from '../../@types/recursive.event.cancel';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userPool = new CognitoUserPool(environment.poolData);
  private cognitoUser: CognitoUser;
  private data: any;

  private _token = null;
  private lastTokenUpdate = new Date().getTime();
  private logoutTimeout;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  async token() {
    await this.resolve();
    return this._token;
  }

  public get isLogged(): boolean {
    return this.cognitoUser && this.data ? true : false;
  }

  async resolve() {
    clearTimeout(this.logoutTimeout);
    if (!this.data || (Date.now() - this.lastTokenUpdate > 300000)) {
      this.lastTokenUpdate = Date.now();
      const cognitoUser = this.userPool.getCurrentUser();

      if (cognitoUser) {
        await new Promise<void>((resolve, reject) => {
          cognitoUser.getSession((e, session: CognitoUserSession) => {
            if (e && e.message != 'User is not authenticated') return reject(e);
            const time = localStorage.getItem('lastTokenUpdate');
            if (time) {
              if ((Date.now() - new Date(time).getTime()) > (600000)) {
                cognitoUser.signOut(() => {
                  resolve();
                });
                return;
              }
            }
            if (session) {
              cognitoUser.refreshSession(
                session.getRefreshToken(),
                (refreshError, response) => {
                  if (refreshError && refreshError.message != 'User is not authenticated') return reject(e);
                  cognitoUser.getUserData((err, data) => {
                    if (err && err.message != 'User is not authenticated') return reject(err);
                    this.cognitoUser = cognitoUser;
                    this.data = data;
                    this._token = response.idToken.jwtToken;
                    resolve();
                  });
                }
              );
            }
          });
        });
      }
    }

    localStorage.setItem('lastTokenUpdate', new Date().toISOString());
    this.logoutTimeout = setTimeout(() => {
      this.logout();
    }, 600000);
  }

  userData(key) {
    if (this.data) {
      for (let attribute of this.data.UserAttributes) {
        if (attribute.Name == key) return attribute.Value
      }
    }
    return null;
  }

  get username() {
    return this.data?.Username || null;
  }

  logout() {
    if (this.isLogged) {
      this.cognitoUser.signOut(() => {
        this.cognitoUser = null;
        this.data = null;
        this._token = null;
        this.router.navigate(['main/public/login']);
      });
    }
  }

  async forgotPassword(email) {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return await new Promise((resolve, reject) => {
      cognitoUser.forgotPassword(
        {
          onSuccess: (result) => {
            resolve(result.CodeDeliveryDetails.Destination);
          },
          onFailure: (err) => {
            reject(err)
          },
        },
        { Language: 'pt' }
      );
    });
  }


  async confirmPassword(username: string, code: string, newPassword) {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });
    return await new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(code, newPassword, {
        onFailure(err) {
          reject(err);
        },
        onSuccess() {
          resolve(null);
        },
      });
    });
  }


  isAllowed(data: string | string[]) {
    const arr = Array.isArray(data) ? data : [data];
    if (this.isLogged && arr.includes(this.data.profile)) return true;
    return false;
  }
}
