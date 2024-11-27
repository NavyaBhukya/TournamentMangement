import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  @Output() formSubmitted = new EventEmitter<any>(); // Emit when form is submitted
  @Output() cancel = new EventEmitter<void>(); // Emit when dialog is canceled
  @Input() isEditMode: boolean = false; // Is the form in edit mode
  @Input() playerData: any; // Player data for editing

  addPlayerForm: FormGroup;
  sports: string[] = ['Cricket', 'Football', 'Basketball', 'Tennis', 'Hockey'];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.addPlayerForm = this.fb.group({
      playerName: ['', [Validators.required, Validators.minLength(3)]],
      age: [
        '',
        [Validators.required, Validators.min(10), Validators.max(50)],
      ],
      sport: ['', Validators.required],
      teams: ['', Validators.required],
      profilePicture: [''],
    });
  }
  ngOnInit(): void {
  }

  // Helper method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean | undefined {
    const control = this.addPlayerForm.get(fieldName);
    return control?.invalid && (control.dirty || control.touched);
  }

  // Handle file selection
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      // this.addPlayerForm.patchValue({ profilePicture: this.selectedFile });
    }
  }

  // Submit handler
  onSubmit(): void {
    if (this.addPlayerForm.valid) {
      // const formData = new FormData();
      // formData.append('playerName', this.addPlayerForm.get('playerName')?.value);
      // formData.append('age', this.addPlayerForm.get('age')?.value);
      // formData.append('sport', this.addPlayerForm.get('sport')?.value);
      // formData.append('teams', this.addPlayerForm.get('teams')?.value);
      // if (this.selectedFile) {
      //   formData.append('profilePicture', this.selectedFile);
      // }

      const payload = {
        playerName: this.addPlayerForm.value.playerName,
        age: this.addPlayerForm.value.age,
        sport: this.addPlayerForm.value.sport,
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
  onCancel(): void {
    this.cancel.emit(); // Emit cancel event
  }
}
