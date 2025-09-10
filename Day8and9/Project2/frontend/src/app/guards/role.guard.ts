import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authservice';

export const RoleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const role = authService.getUserRole();

    if (role === expectedRole) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  };
};
