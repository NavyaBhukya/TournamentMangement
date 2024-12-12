import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { allplayers } from '../../interfaces/player.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit, OnChanges {
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Input() playerData: any;
  @Input() onEditPlayerData: allplayers | null = null;
  public isEdit = false
  public isEditMode: boolean = false;
  public addPlayerForm!: FormGroup;
  public sports: string[] = ['Cricket', 'Football', 'Basketball', 'Tennis', 'Hockey'];
  public allteamsData: any
  public playerProfile: string | null = null
  constructor(private fb: FormBuilder, private apiService: ApiService, private commonServ: CommonService) {
  }
  public ngOnInit(): void {
    this.formInit();
    if (this.isEditMode && this.playerData) {
      this.addPlayerForm.patchValue(this.playerData);
    }
    this.commonServ.isEditPlayer.subscribe((res: boolean) => {
      this.isEditMode = res
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onEditPlayerData']) {
      this?.editPlayer()
    }
  }
  public formInit() {
    this.addPlayerForm = this.fb.group({
      playerName: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(10), Validators.max(50), Validators.pattern('^[0-9]*$')]],
      sport: [[], Validators.required],
      profilePicture: ['', Validators.required],
    });
  }
  public getAllTeams() {
    this.apiService.getAllTeams().subscribe({
      next: (data) => {
        this.allteamsData = data
      }
    })
  }
  private editPlayer(): void {
    this.isEdit = true
    const selectedSport = this.sports.find(sport => sport.toLowerCase() === this.onEditPlayerData?.sport[0]?.toLowerCase());
    this.addPlayerForm?.patchValue({
      playerName: this.onEditPlayerData?.playerName,
      age: this.onEditPlayerData?.age,
      sport: selectedSport,
      profile: this.onEditPlayerData?.profilePicture
    });
  }
  public isFieldInvalid(fieldName: string): boolean | undefined {
    const control = this.addPlayerForm.get(fieldName);
    return control?.invalid && (control.dirty || control.touched);
  }
  public onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const selectedFile = input.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size should be not greater than 10MB')
        return;
      }
      this.apiService.uploadProfileImage(selectedFile).subscribe({
        next: (data) => {
          this.playerProfile = data.url
          this.addPlayerForm.patchValue({
            profile: data.url
          })
        }
      })
    }
  }
  public onSubmit(): void {
    if (this.addPlayerForm.valid) {
      const payload = {
        playerName: this.addPlayerForm.value.playerName,
        age: this.addPlayerForm.value.age,
        sport: this.addPlayerForm.value.sport,
        profile: this.playerProfile
      }
      if (this.isEditMode) {
        this.apiService.updatePlayers(this.onEditPlayerData?._id, payload).subscribe({
          next: (res) => {
            this.formSubmitted.emit(res);
            this.isEdit = false
          }
        })
      } else {
        this.apiService.postPlayers(payload).subscribe({
          next: (res) => {
            this.formSubmitted.emit(res);
            this.addPlayerForm.reset();
          },
        })
      }
      this.formSubmitted.emit(payload);
    }
  }
  public onCancel(): void {
    this.cancel.emit();
    this.addPlayerForm.reset();
  }
}
