import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  @Input() confirmatioStr: string = ''
  @Input() tournamentDeleteid: string = ''
  @Output() closeConfirmation = new EventEmitter<string>()
  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router, private commonService: CommonService) { }

  public deleteConfirmation() {
    try {
      if (this.confirmatioStr === 'account') {
        const userId = localStorage.getItem('userId');
        if (userId) {
          this.apiService.deleteUserAccount(userId).subscribe({
            next: () => {
              this.closeConfirmation.emit('deleted')
              localStorage.clear();
              this.commonService.showHeader.emit()
              this.toastr.success('Account deleted successfully');
              this.router.navigate(['/login']);
            },
            error: (error) => {
              console.error('Delete account error', error);
              this.toastr.error('Failed to delete account');
            }
          });
        }
      }
      else if(this.confirmatioStr === 'tournament') {  this.onDeleteTournament(this.tournamentDeleteid) }
    } catch (error) { }
  }
  private onDeleteTournament(tournamentDeleteid: string) {
    try {
      tournamentDeleteid ? (
        this.apiService.deleteTournament(tournamentDeleteid).subscribe({
          next: (res: { message: string }) => {
            this.closeConfirmation.emit('')
            this.toastr.success(res.message)
          }
        })
      ) : null
    } catch (error) { }
  }
  // CLose the confirmation dialog 
  public cancelConfirmation = () => { this.closeConfirmation.emit('rejected') }
}
