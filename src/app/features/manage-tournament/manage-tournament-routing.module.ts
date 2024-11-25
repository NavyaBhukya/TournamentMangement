import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentHomeComponent } from './components/tournament-home/tournament-home.component';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';

const routes: Routes = [
    {  path: '', component: TournamentHomeComponent },
    {
      path: 'manage-tournament', component: AddTournamentComponent,
    },
    {
      path: 'tournament-home', component: TournamentHomeComponent,
    }
  
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTournamentRoutingModule { }
