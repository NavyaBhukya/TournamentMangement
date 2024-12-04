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
  public tableHeader = 'Player Management'
  public allTeamsDataArr: allplayers[] = []
  public columns: string[] = []
  public displayAddPlayerDialog: boolean = false;
  public isEditMode: boolean = false; // Track edit mode
  public currentPlayerData: allplayers | null = null;
  public popupHeading =this.isEditMode ? 'Add player ':'Update player';
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public pageSize: number = 10;  
  // public pageSizeOptions: number[] = [10, 20, 30, 40, 50];
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
      this.apiService.getallPlayers(this.currentPage,this.pageSize).subscribe({
        next: (res:any) => {
          this.allTeamsDataArr = res.data
          console.log(this.allTeamsDataArr);
          
        }
      })
      this.loader.hide()
    } catch (error) {
      console.log(error)
      this.loader.hide()
    }
  }
  public onPageChange(event: any): void {
    console.log(event,'page event');
    this.currentPage = +event.page + 1; // PrimeNG pages are zero-based
    this.pageSize = event.rows; // Rows per page
    this.getallPlayerData();
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
