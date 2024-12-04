import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(private fb: FormBuilder, private apiService: ApiService) { }
  ngOnInit(): void {
    this.teamFormInit();
    this.getAllPlayers();
  }
  public teamFormInit() {
    this.addTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      sport: [null, Validators.required],
      players: [[], Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onEditPlayerData']) {
      this.editPlayer()
    }
  }
  private editPlayer() {
    console.log(this.onEditPlayerData);
    console.log(this.players);
    const selectedPlayers = this.onEditPlayerData.players.join(', ')
    console.log(selectedPlayers);
    this.addTeamForm.patchValue({
      teamName: this.onEditPlayerData?.teamName,
      players: selectedPlayers,
      sport: this.onEditPlayerData?.sport, // Ensure matching value is patched
      // teams: this.onEditPlayerData?.teams,
    });
  }
  isFieldInvalid(field: string): boolean | undefined {
    const control = this.addTeamForm.get(field);
    return control?.touched && control.invalid;
  }
  onCancel() {
    this.cancel.emit();
  }
  onSubmit() {    
    if (this.addTeamForm.valid) {
      const payload = {
        teamName: this.addTeamForm.value.teamName,
        sport: this.addTeamForm.value.sport,
        players: this.addTeamForm.value.players
      }

      if(this.isEditMode){
        this.apiService.updateTeams(this.onEditPlayerData._id,payload).subscribe((data:any)=>{
          next:(res:any)=>{
           this.formSubmitted.emit(res);
          }
        })
      }else{
        this.apiService.postTeams(payload).subscribe({
          next: (res) => {
            this.formSubmitted.emit(res);
          },
        })
      }
     
      console.log('Teams data submitted:', payload);
      this.formSubmitted.emit(payload);
    }
  }
  public getAllPlayers(){
    this.apiService.getallPlayers(1,50).subscribe((data:any)=>{
      this.players = data.data.map((data:any)=>data.playerName)
    })
  }
}
