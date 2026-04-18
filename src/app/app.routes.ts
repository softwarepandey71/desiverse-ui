import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';


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
    data: { roles: ['VENDOR', 'ADMIN'] },
    loadComponent: () =>
      import('./features/product/product-add/product-add')
        .then(m => m.ProductAdd)
  },

  // 🛠 Admin Routes
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard')
        .then(m => m.Dashboard)
  },
  {
    path: 'admin/approve',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import('./features/admin/approve-products/approve-products')
        .then(m => m.ApproveProducts)
  },

   // 🔥 DASHBOARD LAYOUT WRAPPER
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [

      {
        path: 'add-product',
        canActivate: [roleGuard],
        data: { roles: ['VENDOR', 'ADMIN'] },
        loadComponent: () =>
          import('./features/product/product-add/product-add')
            .then(m => m.ProductAdd)
      },

      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'admin/approve',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/approve-products/approve-products')
            .then(m => m.ApproveProducts)
      },
      {
        path: 'admin/orders',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/orders/admin-orders/admin-orders')
            .then(m => m.AdminOrders)
      }

    ]
  },
  

  // ❌ Fallback
  {
    path: '**',
    redirectTo: ''
  }
];