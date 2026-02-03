import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'buscador',
    loadComponent: () => import('./components/buscador/buscador').then(m => m.Buscador)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
