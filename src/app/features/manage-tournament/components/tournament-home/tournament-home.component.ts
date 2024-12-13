import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { allTournaments, SingleTeamInterface, TotalTeamsInterface, tournamentObj } from '../../interface/tournament.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.scss'],
})
export class TournamentHomeComponent implements OnInit {
  public tableTitle = 'Tournaments';
  public addButtonLabel = 'Create Tournament';
  public isAddTournament: boolean = false
  public showDeleteConfirmation: boolean = false
  public tournamentForm!: FormGroup;
  public allTournamentsArr: tournamentObj[] = []
  public tournamentHeadings: string[] = []
  public previewUrl: string | null = null;
  public currentDate: Date = new Date()
  public sportTypeString: string = 'pool'
  public updateTournamentData: tournamentObj | null = null;
  public tournamentProfile: string | null = null
  public allTeamsDataArr: SingleTeamInterface[] = [];
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  public tableHeader = 'Tournament Management'
  public selectedStartDate: Date | null = null
  public sportNames: { name: string, value: string }[] = [
    { name: 'Cricket', value: 'cricket' },
    { name: 'Kabaddi', value: 'kabaddi' },
    { name: 'Socker', value: 'socker' },
    { name: 'Foot Ball', value: 'football' },
    { name: 'Badmitton', value: 'badmitton' },
  ]
  public tournamentId !: string
  public sportsFormat: { name: string, value: string }[] = [{ name: 'Single Elimination', value: 'singleelimination' }, { name: 'Double Elimination', value: 'doubleelimination' }, { name: 'Round Robbin', value: "roundrabbin" }]

  constructor(private apiService: ApiService, private fb: FormBuilder, private toastr: ToastrService, private commonService: CommonService) { }
  ngOnInit(): void {
    this.getAllTournaments()
    this.tournamentFormInit()
  }

  private tournamentFormInit(): void {
    this.tournamentForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      sport: ['', Validators.required],
      teams: [[], Validators.required],
      description: [''],
      pools: [null],
      format: [null],
      profile: [''],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      maxTeams: [null, [Validators.min(2), Validators.max(30)]],
    });
  }
  // getter method for name
  get name() {
    return this.tournamentForm.get('name')
  }
  private getAllTournaments(page: number = 0, pageSize: number = 10): void {
    try {
      this.apiService.getAllTournaments(page, pageSize).subscribe({
        next: (res: allTournaments) => { this.allTournamentsArr = res.data }
      })
    } catch (error) { throw error }
  }
  private getTeams(): void {
    try {
      (!this.allTeamsDataArr.length) ?
        this.apiService.getAllTeams().subscribe({
          next: (res: TotalTeamsInterface) => {
            this.allTeamsDataArr = res.data
          }
        }) : null
    } catch (error) { }
  }
  public selectStartDate(event: Date) {
    this.selectedStartDate = event
  }
  public setTourFormat(str: string) {
    this.sportTypeString = str
    if (this.sportTypeString === 'pool') {
      this.tournamentForm.get('pools')?.setValidators(Validators.required)
      this.tournamentForm.get('format')?.reset()
      this.tournamentForm.get('format')?.clearValidators()
    } else {
      this.tournamentForm.get('format')?.setValidators(Validators.required)
      this.tournamentForm.get('pools')?.reset()
      this.tournamentForm.get('pools')?.clearValidators()
    }
    this.tournamentForm.get('pools')?.updateValueAndValidity()
    this.tournamentForm.get('format')?.updateValueAndValidity()
  }
  public onFileSelected(event: Event): void {
    try {
    const imageData = event.target as HTMLInputElement;

      this.commonService.onProfileImageUploads(imageData).subscribe((res: string) => {
        this.tournamentProfile = (res && res !== '') ? res : null;
        if (!this.updateTournamentData) {
          this.tournamentForm.patchValue({
            profile: this.tournamentProfile
          })
        }
      })
    } catch (error) { throw error }
  }
  public onSubmit() {
    try {
      if (this.tournamentForm.valid && !this.updateTournamentData) {
        this.tournamentForm.patchValue({
          sport: this.tournamentForm.value.sport?.name,
          format: this.tournamentForm.value.format?.name
        })
        this.apiService.postTournaments(this.tournamentForm.value).subscribe({
          next: () => {
            this.isAddTournament = false;
            this.getAllTournaments()
            this.toastr.success('Tournament created successfully')
          }, error(err: HttpErrorResponse) { console.warn(err); }
        })
      }
      else if (this.updateTournamentData) {
        const formValue = { ...this.tournamentForm.value };
        if (formValue.sport && typeof formValue.sport === 'object') {
          formValue.sport = formValue.sport.name || formValue.sport.value;
        }
        if (formValue.format && typeof formValue.format === 'object') {
          formValue.format = formValue.format.name || formValue.format.value;
        }
        formValue.profile = this.tournamentProfile // setting the updated profile
        this.apiService.updateTournaments(this.updateTournamentData._id, formValue).subscribe({
          next: () => {
            this.isAddTournament = false;
            this.getAllTournaments()
            this.toastr.success('Tournament updated successfully')
          }, error(err) { throw err }
        })
      } else;
    } catch (error) { }
  }
  public onCreateTournament(data: tournamentObj) {
    try {
      this.getTeams()
      if (!data) {
        this.isAddTournament = true;
        this.tournamentProfile = null
        this.tournamentForm.reset();
        this.sportTypeString = 'pool';
        return;
      }
      if (new Date(data.startDate) > new Date()) {
        this.isAddTournament = true;
        this.updateTournamentData = data
        this.sportTypeString = data.pools ? 'pool' : 'format';
        this.tournamentProfile = data.profile || null
        this.tournamentForm.patchValue({
          name: data.name || '',
          sport: this.sportNames.find((res => res.name === data.sport)) || '',
          teams: data.teams || [],
          description: data.description || '',
          pools: data.pools || null,
          format: this.sportsFormat.find((res => res.name === data.format)) || '',
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null,
          maxTeams: data.maxTeams || null
        })
      }
      else { this.toastr.warning('Warning', 'You can not edit tournament now') }
    }
    catch (error) { throw error }
  }
  public handleSearch(term: string): void { }
  deleteConfirmation(event: tournamentObj) {
    this.showDeleteConfirmation = !this.showDeleteConfirmation
    this.tournamentId = event._id
  }
  public onPageChange(event: { page: number, rows: number }): void {
    this.currentPage = event.page + 1;
    this.pageSize = event.rows;
    this.getAllTournaments(this.currentPage, this.pageSize);
  }
  public closeDialog(event: string) {
    this.getAllTournaments()
    this.showDeleteConfirmation = false
  }
}
