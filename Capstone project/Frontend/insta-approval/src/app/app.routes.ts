import { Routes } from '@angular/router';

export const routes: Routes = [
  // Landing Page
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(m => m.LandingComponent),
    pathMatch: 'full'
  },

  // Authentication
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },

  // Customer dashboard and loan-related routes
  {
    path: 'customer/dashboard',
    loadComponent: () =>
      import('./features/customer/dashboard/dashboard.component').then(m => m.DashboardComponent),
    // Optional: add route guard here using `canActivate` if you implement a standalone guard
  },
  {
    path: 'loan-apply',
    loadComponent: () =>
      import('./features/loan-transaction/loan-apply/loan-apply.component').then(m => m.LoanApplyComponent),
  },
  {
    path: 'loan-status',
    loadComponent: () =>
      import('./features/loan-transaction/loan-status/loan-status.component').then(m => m.LoanStatusComponent),
  },
  {
    path:'loan-apply/:id',
    loadComponent: () =>
      import('./features/loan-transaction/loan-apply/loan-apply.component').then(m => m.LoanApplyComponent),
  }
,
  // Admin login and admin panel routes
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/login/admin-login.component').then(m => m.AdminLoginComponent),
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    // Optional: protect with canActivate route guard
  },
  {
    path: 'admin/loan-management',
    loadComponent: () =>
      import('./features/admin/loan-management/loan-management.component').then(m => m.LoanManagementComponent),
    // Optional route guard can be added here
  },

  // Wildcard route to redirect unknown URLs to landing page
  {
    path: '**',
    redirectTo: ''
  }
];
