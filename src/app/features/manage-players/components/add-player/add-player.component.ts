import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Input() isEditMode: boolean = false;
  @Input() playerData: any;
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
  public onCancel(): void {
    this.cancel.emit();
  }
}
