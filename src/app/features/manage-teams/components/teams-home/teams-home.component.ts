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
  public allTeamsDataArr: any[]=[]
  public displayAddTeamsDialog: boolean = false;
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public isEditMode: boolean = false; // Track edit mode
  public popupHeading =this.isEditMode ? 'Add team ':'Update team';
  public editPlayerData:any;
  public tableHeader = 'Teams Management'
  public currentPlayerData: any;

  // Add page size options
  public pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  constructor(private apiService: ApiService,private loader:LoaderService) { }
  ngOnInit(): void {
    this.getallTeamsData()
  }
  public handleAdd(data:any) {
    this.editPlayerData = data
    this.displayAddTeamsDialog = true;
  }
  public handleSearch(term: string) {
  }
  public handleDialogClose(rowData?:any) {
    this.displayAddTeamsDialog = false;
    if(rowData){      
      this.getallTeamsData()
    }
  }
  public getallTeamsData(page: number = 0, pageSize: number = 10): void {
    try {
      this.apiService.getAllTeams(page,pageSize).subscribe({
        next: (res) => {
          this.allTeamsDataArr = res.data ? res.data : []
          this.totalRecords = res.total     
          console.log(this.allTeamsDataArr,'all temas');
               
        }
      })
    } catch (error) {
    }
  }
  public onPageChange(event:{page:number,pagesize:number}): void {    
    this.currentPage = +event.page + 1; // PrimeNG pages are zero-based
    this.pageSize = event.pagesize; // Rows per page
    this.getallTeamsData(this.currentPage, this.pageSize);
  }
  public editTeam(rowData: any): void {
    this.currentPlayerData = rowData; // Pass the selected player data
  }
  public deleteTeam(rowData: any) {
    this.apiService.deleteams(rowData._id).subscribe({
      next: () => {
       console.log('team deleted');
       this.getallTeamsData()

      },
      error() {
      }
    })
  }
}
