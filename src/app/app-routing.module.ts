import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userLoggedinGuard } from './guards/logInGuard/user-loggedin.guard';
import { authGuard, authRedirectGuard } from './guards/authGuard/auth.guard';

const routes: Routes = [
  {
    path: 'feature', loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule), canActivate: [userLoggedinGuard]
  },
  {
    path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),canActivate:[authRedirectGuard]
  },
  {
    path: 'shared', loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule)
  },
  {
    path: '**', redirectTo: '',canActivate:[authRedirectGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
