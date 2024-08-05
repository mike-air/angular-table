import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      // If logged in and trying to access the login page, redirect to home
      if (state.url === '/login') {
        return this.router.createUrlTree(['/home']);
      }
    } else {
      // If not logged in and trying to access a protected route, redirect to login
      if (state.url !== '/login' && state.url !== '/forgot-password') {
        return this.router.createUrlTree(['/login']);
      }
    }
    // Allow access to login and forgot-password routes
    return true;
  }
}
