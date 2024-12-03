import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTournamentRoutingModule } from './manage-tournament-routing.module';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import { TournamentHomeComponent } from './components/tournament-home/tournament-home.component';
import { SharedModule } from "../../shared/shared.module";
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AddTournamentComponent,
    TournamentHomeComponent
  ],
  imports: [
    CommonModule,PaginatorModule,
    ManageTournamentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DialogModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class ManageTournamentModule { }
