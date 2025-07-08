import { appConfig } from './app.config';
import { provideRouter, Routes, withComponentInputBinding, withRouterConfig } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
];

