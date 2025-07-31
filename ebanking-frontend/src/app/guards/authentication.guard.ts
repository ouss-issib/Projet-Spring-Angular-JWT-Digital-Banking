import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('Guard: isAuthenticated', authService.isAuthenticated, 'accessToken', authService.accessToken);
  if(!authService.isAuthenticated) {
      router.navigate(['/login']);
      return false;
  }
  return true;
};
