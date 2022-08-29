import { RouterModule, CanLoad, ActivatedRouteSnapshot, Route, UrlSegment, Router, ActivatedRoute, Resolve, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';




@Injectable()
export class Auth implements CanActivate {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {

  }

  async canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    try {
      await this.authService.resolve();
    } catch (e) {
      console.log(e);
      this.router.navigate(['error']);
      return false;
    }


    if (this.authService.isLogged) {
      if (route.data.access == 'public') {
        this.router.navigate(['main', 'private']);
        return false;
      }

      if (route.data?.profiles){
        if(!this.authService.isAllowed(route.data.profiles))return false;
      }

    } else {
      if (route.data.access == 'private') {
        this.router.navigate(['main', 'public']);
        return false;
      }
    }

    return true;
  }

}
