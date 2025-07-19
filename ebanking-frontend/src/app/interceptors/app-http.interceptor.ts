import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!authService.isAuthenticated) {
    return next(req);
  }

  const token = authService.accessToken;
  if (!token) {
    // No token present, just continue without logout
    return next(req);
  }

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(authReq).pipe(
    catchError(error => {
      if ((error.status === 401 || error.status === 403) && token) {
        // Only logout if token exists AND we get 401 or 403
        // authService.logout();
      }
      return throwError(() => error);
    })
  );
};

