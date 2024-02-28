import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const url: string = state.url;

    if (url === '/chat-home') {
      if (this.authService.getIsAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/signin']);
        return false;
      }
    } else {
      return true; 
    }
  }
}

