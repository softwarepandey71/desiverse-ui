import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

export const routes: Routes = [

  // 🔓 PUBLIC ROUTES
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
   {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout')
        .then(m => m.Checkout)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart')
        .then(m => m.Cart)
  },

  // 🔐 PROTECTED ROUTES (WITH LAYOUT)
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [

      // 🛒 Vendor
      {
        path: 'add-product',
        canActivate: [roleGuard],
        data: { roles: ['VENDOR', 'ADMIN'] },
        loadComponent: () =>
          import('./features/product/product-add/product-add')
            .then(m => m.ProductAdd)
      },

      // 🛠 Admin Dashboard
      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      // ✅ Approve Products
      {
        path: 'admin/approve',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/approve-products/approve-products')
            .then(m => m.ApproveProducts)
      },

      // 📦 Orders
      {
        path: 'admin/orders',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'VENDOR'] },
        loadComponent: () =>
          import('./features/admin/orders/admin-orders/admin-orders')
            .then(m => m.AdminOrders)
      }

    ]
  },

  // 🛍 PRODUCT DETAIL (PUBLIC)
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product/product-detail/product-detail')
        .then(m => m.ProductDetail)
  },

  // ❌ FALLBACK
  {
    path: '**',
    redirectTo: ''
  }
];