import { UserGuardGuard } from './public/guards/user-guard.guard';
import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  CanActivateChild,
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dogs',
    loadChildren: () =>
      import('./public/modules/pets/pets.module').then((m) => m.PetsModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./public/modules/account/account.module').then(
        (m) => m.AccountModule
      ),
    canActivate: [UserGuardGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./private/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: '/',  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
