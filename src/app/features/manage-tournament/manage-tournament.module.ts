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
@NgModule({
  declarations: [
    AddTournamentComponent,
    TournamentHomeComponent
  ],
  imports: [
    CommonModule,
    ManageTournamentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DialogModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule
]
})
export class ManageTournamentModule { }
