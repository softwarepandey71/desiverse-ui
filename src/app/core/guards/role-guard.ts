import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const role = localStorage.getItem('role');
  return role === route.data['role'];
};
