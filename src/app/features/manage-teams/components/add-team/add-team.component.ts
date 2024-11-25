import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent {
  addTeamForm!: FormGroup;
  sports = [
    { label: 'Cricket', value: 'cricket' },
    { label: 'Football', value: 'football' },
    { label: 'Basketball', value: 'basketball' }
  ];
  players = [
    { label: 'Player 1', value: 'player1' },
    { label: 'Player 2', value: 'player2' },
    { label: 'Player 3', value: 'player3' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      sport: [null, Validators.required],
      players: [[], Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean | undefined {
    const control = this.addTeamForm.get(field);
    return control?.touched && control.invalid;
  }

  onSubmit() {
    if (this.addTeamForm.valid) {
      console.log('Team added:', this.addTeamForm.value);
      // Perform form submission logic
    }
  }
  
}
