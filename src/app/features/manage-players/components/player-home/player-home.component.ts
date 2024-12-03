import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { allplayers } from '../../interfaces/player.interface';

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
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getallPlayerData();
  }
  public handleAdd(): void {
    this.isEditMode = false;
    this.currentPlayerData = null;
    this.displayAddPlayerDialog = true;
  }
  public handleDialogClose(data?: any): void {
    this.displayAddPlayerDialog = false;
    this.isEditMode = false;
    this.currentPlayerData = null;
    if (data) {
      this.getallPlayerData();
    }
  }
  public handleSearch(term: string) {
  }
  public getallPlayerData(): void {
    try {
      this.apiService.getallPlayers().subscribe({
        next: (res) => {
          this.allTeamsDataArr = res
        }
      })
    } catch (error) {
    }
  }
  public editPlayer(rowData: any): void {
  }
  public deletePlayer(rowData: any): void {
    this.apiService.deletePlayers(rowData._id).subscribe(() => {
      this.getallPlayerData()
    })
  }
}
