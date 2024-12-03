import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-teams-home',
  templateUrl: './teams-home.component.html',
  styleUrls: ['./teams-home.component.scss']
})
export class TeamsHomeComponent implements OnInit {
  public tableTitle = 'Added Teams';
  public addButtonLabel = 'Add Team';
  public columns: string[] = []
  public allTeamsDataArr: any
  public displayAddTeamsDialog: boolean = false;

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getallTeamsData()
  }
  public handleAdd() {
    this.displayAddTeamsDialog = true;
  }
  public handleSearch(term: string) {
  }
  public handleDialogClose() {
    this.displayAddTeamsDialog = false;
  }
  public getallTeamsData(): void {
    try {
      this.apiService.getAllTeams().subscribe({
        next: (res) => {
          this.allTeamsDataArr = res
        }
      })
    } catch (error) {
    }
  }
  public deleteTeam(rowData: any) {
    this.apiService.deleteams(rowData._id).subscribe({
      next: () => {
       
      },
      error() {
      }

    })
  }
}
