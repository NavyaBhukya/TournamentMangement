import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent {
  addPlayerForm: FormGroup;
  sports: string[] = ['Cricket', 'Football', 'Basketball', 'Tennis', 'Hockey'];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.addPlayerForm = this.fb.group({
      playerName: ['', [Validators.required, Validators.minLength(3)]],
      age: [
        '',
        [Validators.required, Validators.min(10), Validators.max(50)],
      ],
      sport: ['', Validators.required],
      teams: ['', Validators.required],
      profilePicture: ['', Validators.required],
    });
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
      this.addPlayerForm.patchValue({ profilePicture: this.selectedFile });
    }
  }

  // Submit handler
  onSubmit(): void {
    if (this.addPlayerForm.valid) {
      const formData = new FormData();
      formData.append('playerName', this.addPlayerForm.get('playerName')?.value);
      formData.append('age', this.addPlayerForm.get('age')?.value);
      formData.append('sport', this.addPlayerForm.get('sport')?.value);
      formData.append('teams', this.addPlayerForm.get('teams')?.value);
      if (this.selectedFile) {
        formData.append('profilePicture', this.selectedFile);
      }

      console.log('Player data submitted:', formData);

      // Call your service to post the form data to the backend here
    }
  }
}
