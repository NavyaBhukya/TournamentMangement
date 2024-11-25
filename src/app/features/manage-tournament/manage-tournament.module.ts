import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageTournamentRoutingModule } from './manage-tournament-routing.module';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import { TournamentHomeComponent } from './components/tournament-home/tournament-home.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    AddTournamentComponent,
    TournamentHomeComponent
  ],
  imports: [
    CommonModule,
    ManageTournamentRoutingModule,
    SharedModule
]
})
export class ManageTournamentModule { }
