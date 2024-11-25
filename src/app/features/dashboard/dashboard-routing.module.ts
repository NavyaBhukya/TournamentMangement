import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard', component: HomeComponent,
    children: [
      { 
        path: 'home', component: HomeComponent 
      },
      { 
        path: 'header', component: HeaderComponent 
      },
      { 
        path: 'footer', component: FooterComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
