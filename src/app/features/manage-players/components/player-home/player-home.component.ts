import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { allplayers } from '../../interfaces/player.interface';
import { LoaderService } from 'src/app/services/loader.service';
import { CommonService } from 'src/app/services/common.service';

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
  public popupHeading =this.isEditMode ? 'Add player ':'Update player';
  constructor(private apiService: ApiService, private loader: LoaderService, private commonServ: CommonService) { }
  ngOnInit(): void {
    this.getallPlayerData();
  }
  editPlayerData: allplayers | null = null
  public handleAdd(event: allplayers): void {
    this.editPlayerData = event

    this.currentPlayerData = null;
    this.displayAddPlayerDialog = true;
  }
  public handleDialogClose(data?: any): void {
    this.displayAddPlayerDialog = false;
    this.currentPlayerData = null;
    if (data) {
      this.getallPlayerData();
    }
  }
  public handleSearch(term: string) {
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
    this.currentPlayerData = rowData; // Pass the selected player data
  }
  public deletePlayer(rowData: any): void {
    this.apiService.deletePlayers(rowData._id).subscribe(() => {
      this.getallPlayerData()
    })
  }
}
