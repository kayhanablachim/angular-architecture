import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    // Note that this is the Angular 8+ way to lazy load routes
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  {
    // Note that this is the Angular 8+ way to lazy load routes
    path: 'villains',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./villains/villains.module').then((m) => m.VillainsModule),

    data: { preload: false },
  },
];
