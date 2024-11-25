import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { DashboardModule } from "./dashboard/dashboard.module";

@NgModule({
  declarations: [
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    DashboardModule
]
})
export class FeaturesModule { }
