import { Component } from '@angular/core';

@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrls: ['./player-home.component.scss']
})
export class PlayerHomeComponent {
  public tableTitle = 'Added Players';
  public addButtonLabel = 'Add Player';
  public columns = [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'team', header: 'Team' },
  ];
  public data = [
    { name: 'Player 1', age: 25, team: 'Team A' },
    { name: 'Player 2', age: 27, team: 'Team B' },
    { name: 'Player 3', age: 24, team: 'Team A' },
  ];
  public handleAdd() {
    console.log('Add Player button clicked');
  }
  public handleSearch(term: string) {
    console.log('Search term:', term);
  }
}
