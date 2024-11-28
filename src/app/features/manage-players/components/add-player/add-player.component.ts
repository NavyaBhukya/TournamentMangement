import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { allplayers } from '../../interfaces/player.interface';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit, OnChanges {
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Input() isEditMode: boolean = false;
  @Input() playerData: any;
  @Input() onEditPlayerData: allplayers | null = null;
  public addPlayerForm: FormGroup;
  public sports: string[] = ['Cricket', 'Football', 'Basketball', 'Tennis', 'Hockey'];
  public selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.addPlayerForm = this.fb.group({
      playerName: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(10), Validators.max(50)]],
      sport: ['', Validators.required],
      teams: ['', Validators.required],
      profilePicture: [''],
    });
  }
  public ngOnInit(): void {
    console.log(this.onEditPlayerData, 'edit the player');
    this.editPlayer()
    if (this.isEditMode && this.playerData) {
      this.addPlayerForm.patchValue(this.playerData);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onEditPlayerData']) {
      console.log(this.onEditPlayerData);
      this.editPlayer()

    }
  }
  private editPlayer() {
    const selectedSport = this.sports.find(sport => sport.toLowerCase() === this.onEditPlayerData?.sport[0]?.toLowerCase());
    console.log("Selected sport for patching:", selectedSport);
  
    this.addPlayerForm.patchValue({
      playerName: this.onEditPlayerData?.playerName,
      age: this.onEditPlayerData?.age,
      sport: selectedSport, // Ensure matching value is patched
      teams: this.onEditPlayerData?.teams,
      profilePictures: this.onEditPlayerData?.profilePicture
    });
  }
  
  public isFieldInvalid(fieldName: string): boolean | undefined {
    const control = this.addPlayerForm.get(fieldName);
    return control?.invalid && (control.dirty || control.touched);
  }
  public onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }
  public onSubmit(): void {
    if (this.addPlayerForm.valid) {
      const payload = {
        playerName: this.addPlayerForm.value.playerName,
        age: this.addPlayerForm.value.age,
        sport: 'Cricket',
        teams: this.addPlayerForm.value.teams,
        profilePicture: this.addPlayerForm.value.profilePicture
      }
      this.apiService.postPlayers(payload).subscribe({
        next: (res) => {
          this.formSubmitted.emit(res);
        },
      })
      console.log('Player data submitted:', payload);
      this.formSubmitted.emit(payload);
    }
  }
  public onCancel(): void {
    this.cancel.emit();
  }
}
