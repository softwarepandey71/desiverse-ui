import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned).pipe(
    catchError(err => {

      if (err.status === 401) {
        // 🔥 Auto logout
        localStorage.clear();
        router.navigateByUrl('/login');
      }

      return throwError(() => err);
    })
  );
  }

  return next(req);
};