import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { TableComponent } from './components/table/table.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
@NgModule({
  declarations: [
    SharedComponent,
    TableComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,TableModule,ReactiveFormsModule,TooltipModule,PaginatorModule
  ],exports:[TableComponent,ConfirmationComponent]
})
export class SharedModule { }
