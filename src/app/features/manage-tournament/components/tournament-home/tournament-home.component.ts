import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { allTournaments } from '../../interface/tournament.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  teamsOptions = [
    { label: 'Team A', value: 'Team A' },
    { label: 'Team B', value: 'Team B' },
    { label: 'Team C', value: 'Team C' },
    { label: 'Team D', value: 'Team D' },
  ];
  columns = [
    { field: 'name', header: 'Tournament Name' },
    { field: 'sport', header: 'Sport' },
    { field: 'age', header: 'Start Date' },
    { field: 'team', header: 'End Date' },
    { field: 'format', header: 'Format' },
  ];
  data = [
    { name: 'IPL', age: '22/11/2024', team: '25/12/2024', sport: 'Cricket', format: 'Round Robin' },
    { name: 'T20', age: '13/2/2025', team: '30/4/2025', sport: 'Cricket', format: 'knockout' },
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
      name: ['', Validators.required],
      sport: ['', Validators.required],
      teams: [[], Validators.required],
      pools: [null],
      format: [''],
      profile: [''],
      startDate: [null],
      endDate: [null],
      maxTeams: [null, [Validators.min(2), Validators.max(30)]],
    });
  }
  private getAllTournaments(): void {
    try {
      this.apiService.getAllTournaments().subscribe({
        next: (res: allTournaments[]) => {
          console.log(res, 'All tournaments');
        }
      })
    } catch (error) {
      throw error
    }
  }
  previewUrl: string | null = null;

  // onFileSelected(event: Event): void {
  //   const element = event.target as HTMLInputElement;
  //   const fileList: FileList | null = element.files;
    
  //   if (fileList) {
  //     this.selectedFile = fileList[0];
  //     this.tournamentForm.patchValue({
  //       profile: this.selectedFile.name
  //     });

  //     // Create preview
  //     // this.createImagePreview(this.selectedFile);
  //   }
  // }
  onSubmit() {
    if (this.tournamentForm.valid) {
      console.log('Form Submitted:', this.tournamentForm.value);
      this.isAddTournament = false;
    }
  }
}
