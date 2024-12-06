import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { TeamsHomeComponent } from './components/teams-home/teams-home.component';

const routes: Routes = [
  { path: '', component: TeamsHomeComponent },
  {
    path: 'manage-team', component: AddTeamComponent,
  },
  {
    path: 'team-home', component: TeamsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTeamsRoutingModule { }
