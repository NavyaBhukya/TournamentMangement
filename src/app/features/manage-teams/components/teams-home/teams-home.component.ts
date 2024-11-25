import { Component } from '@angular/core';

@Component({
  selector: 'app-teams-home',
  templateUrl: './teams-home.component.html',
  styleUrls: ['./teams-home.component.scss']
})
export class TeamsHomeComponent {
  public tableTitle = 'Added Teams';
  public addButtonLabel = 'Add Team';
  public columns = [
    { field: 'name', header: 'Team Name' },
    { field: 'age', header: 'Sports Name' },
    { field: 'team', header: 'Number of players' },
  ];
  public data = [
    // { name: 'Team 1', age: 'cricket', team: 15 },
    // { name: 'Team 2', age: 'FootBall', team: 7},
    // { name: 'Team 3', age: 'Badminton', team: 2 },
  ];
  public handleAdd() {
    console.log('Add Player button clicked');
  }
  public handleSearch(term: string) {
    console.log('Search term:', term);
  }
}
