import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,OverlayPanelModule,
    DialogModule, ReactiveFormsModule,SharedModule
  ],
  exports: [HeaderComponent, HomeComponent]
})
export class DashboardModule { }
