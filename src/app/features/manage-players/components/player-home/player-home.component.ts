import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { allplayers } from '../../interfaces/player.interface';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrls: ['./player-home.component.scss']
})
export class PlayerHomeComponent implements OnInit {
  public tableTitle = 'Added Players';
  public addButtonLabel = 'Add Player';
  public allTeamsDataArr: allplayers[] = []
  public columns: string[] = []
  public displayAddPlayerDialog: boolean = false;
  public isEditMode: boolean = false; // Track edit mode
  public currentPlayerData: allplayers | null = null;
  constructor(private apiService: ApiService, private loader: LoaderService) { }
  ngOnInit(): void {
    this.getallPlayerData();
  }
  editPlayerData: allplayers | null = null
  public handleAdd(event: allplayers): void {
    this.editPlayerData = event
    console.log(this.editPlayerData);
    
    this.isEditMode = false;
    this.currentPlayerData = null;
    this.displayAddPlayerDialog = true;
  }
  public handleDialogClose(data?: any): void {
    this.displayAddPlayerDialog = false;
    this.isEditMode = false;
    this.currentPlayerData = null;
    if (data) {
      console.log('Player added:', data);
      this.getallPlayerData();
    }
  }
  public handleSearch(term: string) {
    console.log('Search term:', term);
  }
  public getallPlayerData(): void {
    try {
      this.loader.show()
      this.apiService.getallPlayers().subscribe({
        next: (res) => {
          this.allTeamsDataArr = res
        }
      })
      this.loader.hide()
    } catch (error) {
      console.log(error)
      this.loader.hide()

    }
  }
  public editPlayer(rowData: any): void {
    console.log(rowData,'jjjjjjjjjjjjjjjjjjjjjjjj');
    
    // this.isEditMode = true; // Set edit mode to true
    this.currentPlayerData = rowData; // Pass the selected player data
    // this.displayAddPlayerDialog = true; // Open the dialog
  }
  public deletePlayer(rowData: any): void {
    this.apiService.deletePlayers(rowData._id).subscribe(() => {
      console.log('player deleted');
      this.getallPlayerData()
    })
  }
}
