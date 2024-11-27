import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { TableComponent } from './components/table/table.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    SharedComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,TableModule,ReactiveFormsModule,TooltipModule
  ],exports:[TableComponent]
})
export class SharedModule { }
