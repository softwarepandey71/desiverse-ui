import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [

  // 🔓 Public Routes
  {
    path: '',
    loadComponent: () =>
      import('./features/product/product-list/product-list')
        .then(m => m.ProductList)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register')
        .then(m => m.Register)
  },

  // 🛒 Vendor Routes
  {
    path: 'add-product',
    canActivate: [authGuard, roleGuard],
    data: { role: 'VENDOR' },
    loadComponent: () =>
      import('./features/product/product-add/product-add')
        .then(m => m.ProductAdd)
  },

  // 🛠 Admin Routes
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard')
        .then(m => m.Dashboard)
  },
  {
    path: 'admin/approve',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./features/admin/approve-products/approve-products')
        .then(m => m.ApproveProducts)
  },

  // ❌ Fallback
  {
    path: '**',
    redirectTo: ''
  }
];