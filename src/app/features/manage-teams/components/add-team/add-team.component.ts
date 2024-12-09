import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Input() onEditPlayerData: any;
  addTeamForm!: FormGroup;
  public isEditMode: boolean = false;
  public teamProfile: string | null = null
  public sports = [
    { label: 'Cricket', value: 'cricket' },
    { label: 'Football', value: 'football' },
    { label: 'Basketball', value: 'basketball'}
  ];
  public players = [];
  constructor(private fb: FormBuilder, private commonServ: CommonService, private apiService: ApiService, private commonService: CommonService) { }
  public ngOnInit(): void {
    this.teamFormInit();
    this.getAllPlayers();
    this.commonServ.isEditPlayer.subscribe((res: boolean) => {
      this.isEditMode = res
    })
  }
  public teamFormInit(): void {
    this.addTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      sport: [null, Validators.required],
      profile: [null, Validators.required],
      players: [[]]
    });
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['onEditPlayerData']) {
      this.editPlayer()
    }
  }
  private editPlayer(): void {
    const selectedPlayers = this.onEditPlayerData?.players
    this.addTeamForm.patchValue({
      teamName: this.onEditPlayerData?.teamName,
      players: selectedPlayers,
      sport: this.onEditPlayerData?.sport,
    });
  }
  public isFieldInvalid(field: string): boolean | undefined {
    const control = this.addTeamForm.get(field);
    return control?.touched && control.invalid;
  }
  public onCancel(): void {
    this.cancel.emit();
  }
  public onSubmit(): void {
    if (this.addTeamForm.valid) {
      const payload = {
        teamName: this.addTeamForm.value.teamName,
        sport: this.addTeamForm.value.sport,
        players: this.addTeamForm.value.players,
        profile: this.teamProfile
      }
      if (this.isEditMode) {
        this.apiService.updateTeams(this.onEditPlayerData._id, payload).subscribe({
          next: (res: any) => {
            this.formSubmitted.emit(res);
          }
        })
      } else {
        this.apiService.postTeams(payload).subscribe({
          next: (res) => {
            this.formSubmitted.emit(res);
            this.addTeamForm.reset()
            this.teamProfile = null
          },
        })
      }
      this.formSubmitted.emit(payload);
    }
  }
  public getAllPlayers(): void {
    this.apiService.getallPlayers(1, 50).subscribe((data: any) => {
      this.players = data.data.map((data: any) => data.playerName)
    })
  }
  public onProfileUploaded(event: Event): void {
    try {
      this.commonService.onProfileImageUploads(event).subscribe((res: string) => {
        this.teamProfile = (res && res !== '') ? res : null;
      })
    } catch (error) { console.warn(error) }
  }
}
