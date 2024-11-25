import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayerHomeComponent } from './components/player-home/player-home.component';

const routes: Routes = [
  {  path: '', component: PlayerHomeComponent },
  {
    path: 'manage-player', component: AddPlayerComponent,
  },
  {
    path: 'player-home', component: PlayerHomeComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePlayersRoutingModule { }
