import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component:SigninComponent },
  { path:'login',component:SigninComponent},
  { path:'signup',component:SignupComponent}

  // {
  //   path: 'auth', component:SigninComponent ,

  //   children: [
  //     { path: 'login', loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule) },
     
  //   ]

  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
