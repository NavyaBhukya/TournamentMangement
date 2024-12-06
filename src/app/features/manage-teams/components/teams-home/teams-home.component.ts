import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-teams-home',
  templateUrl: './teams-home.component.html',
  styleUrls: ['./teams-home.component.scss']
})
export class TeamsHomeComponent implements OnInit {
  public tableTitle = 'Added Teams';
  public addButtonLabel = 'Add Team';
  public columns: string[] = []
  public allTeamsDataArr: any[] = []
  public displayAddTeamsDialog: boolean = false;
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public isEditMode: boolean = false;
  public popupHeading = this.isEditMode ? 'Add team ' : 'Update team';
  public editPlayerData: any;
  public tableHeader = 'Teams Management'
  public currentPlayerData: any;
  public pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  constructor(private apiService: ApiService, private loader: LoaderService) { }
  public ngOnInit(): void {
    this.getallTeamsData()
  }
  public handleAdd(data: any) {
    this.editPlayerData = data
    this.displayAddTeamsDialog = true;
  }
  public handleSearch(term: string) {
  }
  public handleDialogClose(rowData?: any) {
    this.displayAddTeamsDialog = false;
    if (rowData) {
      this.getallTeamsData()
    }
  }
  public getallTeamsData(page: number = 0, pageSize: number = 10): void {
    try {
      this.apiService.getAllTeams(page, pageSize).subscribe({
        next: (res) => {
          this.allTeamsDataArr = res.data ? res.data : []
          this.totalRecords = res.total
        }
      })
    } catch (error) {
    }
  }
  public onPageChange(event: { page: number, pagesize: number }): void {
    this.currentPage = +event.page + 1;
    this.pageSize = event.pagesize;
    this.getallTeamsData(this.currentPage, this.pageSize);
  }
  public editTeam(rowData: any): void {
    this.currentPlayerData = rowData;
  }
  public deleteTeam(rowData: any) {
    this.apiService.deleteams(rowData._id).subscribe({
      next: () => {
        this.getallTeamsData()
      },
      error() {
      }
    })
  }
}
