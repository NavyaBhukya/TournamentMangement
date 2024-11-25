import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { allplayers } from '../../interfaces/player.interface';

@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrls: ['./player-home.component.scss']
})
export class PlayerHomeComponent implements OnInit{
  public tableTitle = 'Added Players';
  public addButtonLabel = 'Add Player';
  public columns: Array<{ field: string; header: string }> = [];
  public data: Array<any> = [];
  // public columns = [
  //   { field: 'name', header: 'Name' },
  //   { field: 'age', header: 'Age' },
  //   { field: 'sport', header: 'Sports' },
  //   { field: 'teams', header: 'Team' },
  // ];
  // public data = [
  //   { name: 'Player 1', age: 25, team: 'Team A' },
  //   { name: 'Player 2', age: 27, team: 'Team B' },
  //   { name: 'Player 3', age: 24, team: 'Team A' },
  // ];
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getallPlayersData()
  }
  public handleAdd() {
    console.log('Add Player button clicked');
  }
  public handleSearch(term: string) {
    console.log('Search term:', term);
  }
  public getallPlayersData() {
    this.apiService.getallPlayers().subscribe((response: any[]) => {
      if (response && response.length > 0) {
        // Dynamically set columns based on keys of the first object, excluding unwanted keys
        this.columns = Object.keys(response[0])
          .filter(
            (key) =>
              !key.startsWith('_') && // Exclude keys starting with '_'
              key !== 'createdAt' && // Exclude 'createdAt'
              key !== 'updatedAt' // Exclude 'updatedAt'
          )
          .map((key) => ({
            field: key,
            header: this.formatHeader(key),
          }));
      }
      this.data = response;
      console.log(this.columns);
      console.log(this.data);
    });
  }

  private formatHeader(key: string): string {
    // Capitalize the first letter and replace camelCase or snake_case with spaces
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, (str) => str.toUpperCase());
  }
}
