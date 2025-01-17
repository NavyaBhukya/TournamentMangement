import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentHomeComponent } from './components/tournament-home/tournament-home.component';
import { TournamentDetailsComponent } from './components/tournament-details/tournament-details.component';

const routes: Routes = [
  { path: '', component: TournamentHomeComponent },
  {
    path: 'tournament-home', component: TournamentHomeComponent,
  },
  {
    path: "details/:id", component: TournamentDetailsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTournamentRoutingModule { }
