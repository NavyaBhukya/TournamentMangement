import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { allplayers } from '../../interfaces/player.interface';
import { LoaderService } from 'src/app/services/loader.service';
import { CommonService } from 'src/app/services/common.service';
import { PaginatorState } from 'primeng/paginator';

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
  public isEditMode: boolean = false;
  public currentPlayerData: allplayers | null = null;
  public popupHeading = this.isEditMode ? 'Add player ' : 'Update player';
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public pageSize: number = 10;
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
  public getallPlayerData(currentPage?:number, pageSize?:number): void {
    try {
      this.loader.show()
      this.apiService.getallPlayers(currentPage, pageSize).subscribe({
        next: (res: any) => {
          this.allTeamsDataArr = res.data
          this.totalRecords = res.total
        }
      })
      this.loader.hide()
    } catch (error) {
      this.loader.hide()
    }
  }
  public onPageChange(event: PaginatorState): void {
    console.log(event,'players');
    
    this.currentPage = (event.first && event.page) ? event.first + event.page :1;
    this.pageSize = (event.first && event.page) ? event.first * (event.page+1) :10;
    this.getallPlayerData(this.currentPage , this.pageSize);
    console.log(this.currentPage,this.pageSize);
    
  }
  public editPlayer(rowData: any): void {
    this.currentPlayerData = rowData;
    this.getallPlayerData()
  }
  public deletePlayer(rowData: any): void {
    this.apiService.deletePlayers(rowData._id).subscribe(() => {
      this.getallPlayerData()
    })
  }
}
