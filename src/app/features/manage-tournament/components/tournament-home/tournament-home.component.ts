import { formatDate } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.scss']
})
export class TournamentHomeComponent {
  public tableTitle = 'Tournaments';
  public addButtonLabel = 'Create Tournament';

  columns = [
    { field: 'name', header: 'Tournament Name' },
    { field: 'sport', header: 'Sport' },
    { field: 'age', header: 'Start Date' },
    { field: 'team', header: 'End Date' },
    { field: 'format', header: 'Format' },
  ];
  data = [
    { name: 'IPL', age: '22/11/2024', team: '25/12/2024', sport: 'Cricket', format: 'Round Robin' },
    { name: 'T20', age: '13/2/2025', team: '30/4/2025', sport: 'Cricket', format: 'knockout' },
  ];
  public handleAdd() :void{
    console.log('Add Player button clicked');
  }
  public handleSearch(term: string):void {
    console.log('Search term:', term);
  }
}
