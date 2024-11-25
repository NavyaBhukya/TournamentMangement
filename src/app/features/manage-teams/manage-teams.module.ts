import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageTeamsRoutingModule } from './manage-teams-routing.module';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamsHomeComponent } from './components/teams-home/teams-home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AddTeamComponent,
    TeamsHomeComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,SharedModule,
    ManageTeamsRoutingModule,DropdownModule,MultiSelectModule
  ]
})
export class ManageTeamsModule { }
