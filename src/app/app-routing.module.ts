import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userLoggedinGuard } from './guards/logInGuard/user-loggedin.guard';

const routes: Routes = [
  {
    path: 'feature', loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule), canActivate: [userLoggedinGuard]
  },
  {
    path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'shared', loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule)
  },
  {
    path: '**', redirectTo: ''
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
