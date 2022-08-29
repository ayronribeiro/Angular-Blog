import { Injectable } from '@angular/core';
import { RequestData } from '../../@types/request.config.interface';
import { environment } from '../../environments/environment';
import { connect } from 'socket.io-client';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  callbacks = {};

  on(status: number, callback) {
    this.off(status, callback);
    if (!this.callbacks[status]) this.callbacks[status] = [];
    this.callbacks[status].push(callback);
  }

  off(status: number, callback) {
    if (this.callbacks[status]) {
      const index = this.callbacks[status].indexOf(callback);
      if (index > -1) {
        this.callbacks[status].splice(index, 1);
      }
    }
  }

  private emit(status: number, data) {
    if (this.callbacks[status]) {
      this.callbacks[status].forEach(callback => {
        callback(data);
      });
    }
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  get baseUrl() {
    return `${environment.API_URL}`;
  }

  public async request(path: string, method: string, config?: RequestData): Promise<{status: number, content: any}> {

    const conf: any = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if(this.authService.isLogged)conf.headers['Authorization'] = await this.authService.token();

    var url = new URL(`${environment.API_URL}/api/${path}`);

    if (config?.body)conf.body = config.body;

    if (config?.params) url.search = new URLSearchParams(config.params).toString();

    const response = await fetch(url.toString(), conf);

    const data = await response.json();


    if(response.status == 401){
      if (this.authService.isLogged){
        this.authService.logout();
      }
    }

    this.emit(response.status, data);

    return {
      status: response.status,
      content: data
    };

  }
}
