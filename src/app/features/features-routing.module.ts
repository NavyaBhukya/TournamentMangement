import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/components/home/home.component';
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  // { path: '', redirectTo: 'feature', pathMatch: 'full' },
  {
    path: 'feature', component: FeaturesComponent,
  },
  {
    path: '', component: FeaturesComponent,
  },

  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) },
  { path: 'players', loadChildren: () => import('./manage-players/manage-players.module').then((m) => m.ManagePlayersModule) },
  { path: 'teams', loadChildren: () => import('./manage-teams/manage-teams.module').then((m) => m.ManageTeamsModule) },
  { path: 'tournament', loadChildren: () => import('./manage-tournament/manage-tournament.module').then((m) => m.ManageTournamentModule) },


  // { path: '', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
