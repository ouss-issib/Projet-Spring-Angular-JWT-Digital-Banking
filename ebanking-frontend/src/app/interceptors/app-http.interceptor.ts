import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  if(!authService.isAuthenticated) {
    return next(req);
  }

  let request = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authService.accessToken}`)
  });
  return next(request);
};
