import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authservice';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    
    if (userRole !== 'Admin') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    
    return true;
  }
}