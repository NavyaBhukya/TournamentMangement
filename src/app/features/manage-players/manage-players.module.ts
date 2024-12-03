import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePlayersRoutingModule } from './manage-players-routing.module';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerHomeComponent } from './components/player-home/player-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    AddPlayerComponent,
    PlayerHomeComponent
  ],
  imports: [
    CommonModule,DialogModule,MultiSelectModule,PaginatorModule,
    ManagePlayersRoutingModule,ReactiveFormsModule,SharedModule,DropdownModule
  ]
})
export class ManagePlayersModule { }
