import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { allTournaments } from '../../interface/tournament.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { min } from 'rxjs';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.scss']
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
  public sportTypeString : string = 'pool'
  public sportNames: { name: string, value: string }[] = [
    { name: 'Cricket', value: 'cricket' },
    { name: 'Kabaddi', value: 'kabaddi' },
    { name: 'Socker', value: 'socker' },
    { name: 'Foot Ball', value: 'football' },
    { name: 'Badmitton', value: 'badmitton' },
  ]
  public sportsFormat: { name: string, value: string }[] = [{ name: 'Single Elimination', value: 'singleelimination' }, { name: 'Double Elimination', value: 'doubleelimination' }, { name: 'Round Robbin', value: "roundrabbin" }]
  teamsOptions = [
    { label: 'Team A', value: 'Team A' },
    { label: 'Team B', value: 'Team B' },
    { label: 'Team C', value: 'Team C' },
    { label: 'Team D', value: 'Team D' },
  ];

  public onCreateTournament(): void {
    this.isAddTournament = true
  }
  public handleSearch(term: string): void {
    console.log('Search term:', term);
  }
  constructor(private apiService: ApiService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getAllTournaments()
    this.tournamentFormInit()
  }

  private tournamentFormInit(): void {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      sport: ['', Validators.required],
      teams: [[], Validators.required],
      desc:[''],
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
        next: (res: allTournaments[]) => {
          this.allTournamentsArr = res;
        }
      })
    } catch (error) {
      throw error
    }
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      console.log(file);
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds the 10MB limit.');
        return;
      }
      // Call API service to upload the file
      this.apiService.uploadProfileImage(file).subscribe({
        next: (response: any) => {
          // this.uploadedProfileUrl = response.url; // Save the returned URL
          console.log('Profile image uploaded successfully:', response.url);
          this.tournamentForm.patchValue({
            profile: response.url
          })
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error uploading profile image:', err);
        },
      });
    }
  }
  onSubmit() {
    try {
      if (this.tournamentForm.valid) {
        console.log('Form Submitted:', this.tournamentForm.value);
        this.isAddTournament = false;
        this.apiService.postTournaments(this.tournamentForm.value).subscribe((res: any) => {
          console.log(res, 'posted tour');

        })
      }
    } catch (error) { }

  }
}
