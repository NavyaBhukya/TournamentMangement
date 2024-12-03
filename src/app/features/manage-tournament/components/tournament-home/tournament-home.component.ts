import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { allTournaments } from '../../interface/tournament.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TournamentHomeComponent implements OnInit {
  public tableTitle = 'Tournaments';
  public addButtonLabel = 'Create Tournament';
  public isAddTournament: boolean = false
  public tournamentForm!: FormGroup;
  public allTournamentsArr: allTournaments[] = []
  public tournamentHeadings: string[] = []
  public previewUrl: string | null = null;
  public currentDate: Date = new Date()
  public sportTypeString: string = 'pool'
  public updateTournamentData: allTournaments | null = null;
  public tournamentProfile: string | null = null
  public allTeamsDataArr: any

  public sportNames: { name: string, value: string }[] = [
    { name: 'Cricket', value: 'cricket' },
    { name: 'Kabaddi', value: 'kabaddi' },
    { name: 'Socker', value: 'socker' },
    { name: 'Foot Ball', value: 'football' },
    { name: 'Badmitton', value: 'badmitton' },
  ]
  public sportsFormat: { name: string, value: string }[] = [{ name: 'Single Elimination', value: 'singleelimination' }, { name: 'Double Elimination', value: 'doubleelimination' }, { name: 'Round Robbin', value: "roundrabbin" }]

  constructor(private apiService: ApiService, private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.getAllTournaments()
    this.tournamentFormInit()
    this.getTeams()
  }

  private tournamentFormInit(): void {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      sport: ['', Validators.required],
      teams: [[], Validators.required],
      description: [''],
      pools: [null],
      format: [''],
      profile: [''],
      startDate: [null],
      endDate: [null],
      maxTeams: [null, [Validators.min(2), Validators.max(30)]],
    });
  }
  // getter method for name
  get name() {
    return this.tournamentForm.get('name')
  }
  private getAllTournaments(): void {
    try {
      this.apiService.getAllTournaments().subscribe({
        next: (res: allTournaments[]) => { this.allTournamentsArr = res; }
      })
    } catch (error) { throw error }
  }
  private getTeams(): void {
    try {
      this.apiService.getAllTeams().subscribe({
        next: (res) => {
          this.allTeamsDataArr = res
        }
      })
    } catch (error) { }
  }
  public selectedStartDate(event: Event) {
    const data = event.target
    
  }

  public onFileSelected(event: Event): void {
    try {
      const element = event.target as HTMLInputElement;
      if (element.files && element.files.length > 0) {
        const file = element.files[0];
        if (file.size > 10 * 1024 * 1024) {
          alert('File size should less than 10MB.');
          return;
        }
        this.apiService.uploadProfileImage(file).subscribe({
          next: (response: { message: string, url: string }) => {
            this.tournamentProfile = response.url
            if (!this.updateTournamentData) {
              this.tournamentForm.patchValue({
                profile: response.url
              })
            }
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error uploading profile image:', err);
          },
        });
      }
    } catch (error) { throw error }
  }
  public onSubmit() {
    try {
      if (this.tournamentForm.valid && !this.updateTournamentData) {
        this.tournamentForm.patchValue({
          sport: this.tournamentForm.value.sport?.name || '',
          format: this.tournamentForm.value.format?.name || ''
        })
        this.apiService.postTournaments(this.tournamentForm.value).subscribe({
          next: () => {
            this.isAddTournament = false;
            this.getAllTournaments()
            this.messageService.add({ severity: 'success', summary: "Success", detail: "Tournament created successfully" })
          }
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
            this.messageService.add({ severity: 'success', summary: "Success", detail: "Tournament updated successfully" })
          }, error(err) { throw err }
        })
      } else;
    } catch (error) { }
  }
  public onCreateTournament(data: allTournaments) {
    try {

      this.isAddTournament = true;
      if (!data) {
        this.tournamentProfile = null
        this.tournamentForm.reset();
        this.sportTypeString = 'pool';
        return;
      }
      this.updateTournamentData = data
      this.sportTypeString = data.pool ? 'pool' : 'format';
      this.tournamentProfile = data.profile || null
      this.tournamentForm.patchValue({
        name: data.name || '',
        sport: this.sportNames.find((res => res.name === data.sport)) || '',
        teams: data.teams || [],
        description: data.description || '',
        pools: data.pool || null,
        format: this.sportsFormat.find((res => res.name === data.format)) || '',
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        maxTeams: data.maxTeams || null
      })
      this.isAddTournament = true
    }
    catch (error) { throw error }
  }
  public handleSearch(term: string): void {
  }
  private onDeleteTournament(event: allTournaments) {
    try {
      event._id ? (
        this.apiService.deleteTournament(event._id).subscribe({
          next: (res: { message: string }) => {
            this.getAllTournaments()
            this.messageService.add({ severity: 'success', summary: "Success", detail: res.message })
          }
        })
      ) : null
    } catch (error) { }
  }

  deleteConfirmation(event: allTournaments) {
    this.confirmationService.confirm({
      header: 'Are you sure ?',
      message: 'You want to delethi this tournament ',
      accept: () => {
        this.onDeleteTournament(event)
      },
      reject: () => {
        this.messageService.add({ severity: 'success', summary: 'Rejected', detail: 'Tournament safe', life: 3000 });
      }
    });
  }

}
