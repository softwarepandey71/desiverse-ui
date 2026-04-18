import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const userRole = localStorage.getItem('role');

  const allowedRoles = route.data?.['roles'] as string[];

  // 🔥 Safety check
  if (!userRole) {
    router.navigateByUrl('/login');
    return false;
  }

  if (allowedRoles?.includes(userRole)) {
    return true;
  }

  // ❌ Unauthorized
  router.navigateByUrl('/');
  return false;
};