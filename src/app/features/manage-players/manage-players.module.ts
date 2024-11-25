import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePlayersRoutingModule } from './manage-players-routing.module';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerHomeComponent } from './components/player-home/player-home.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddPlayerComponent,
    PlayerHomeComponent
  ],
  imports: [
    CommonModule,
    ManagePlayersRoutingModule,ReactiveFormsModule,SharedModule
  ]
})
export class ManagePlayersModule { }
