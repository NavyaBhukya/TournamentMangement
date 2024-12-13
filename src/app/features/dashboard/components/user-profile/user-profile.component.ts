import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UserInterface } from '../../interface/common.interface';
import { ToastrService } from 'ngx-toastr';
import { LoginUserData } from 'src/app/auth/interface/auth.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userForm!: FormGroup
  @Output() closeProfile = new EventEmitter<void>()
  @Output() headerProfileImgUrl = new EventEmitter<string | null>()
  public profileImgUrl: string | null = null
  public isUserEdit: boolean = false
  public showDeleteCnfirmation: boolean = false
  public userData: UserInterface | null = null
  constructor(private apiService: ApiService, private toastr: ToastrService, private commonService: CommonService) { }
  ngOnInit(): void {
    this.userFormInit()
    this.getUserDetails()
  }
  private userFormInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      profile: new FormControl(),
      mobile: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    })
  }

  private getUserDetails() {
    try {
      const userId = localStorage.getItem('userId')!
      if (userId) {
        this.apiService.getUserById(userId).subscribe({
          next: (res: { data: UserInterface }) => {
            this.userData = res.data
            this.userForm.patchValue({
              name: this.userData.name, email: this.userData.email, mobile: this.userData.mobile, profile: this.userData.profile ? this.userData.profile : null
            })
            this.profileImgUrl = res.data.profile ? res.data.profile : null
            this.headerProfileImgUrl.emit(res.data.profile ? res.data.profile : null)
          }, error: (err: HttpErrorResponse) => { console.warn(err) }
        })
      }
    } catch (error) { }
  }
  public profileUpload(event: Event) {
    try {
      const imgFile = event.target as HTMLInputElement;
      if (imgFile.files && imgFile.files.length) {
        const file = imgFile.files[0]
        this.apiService.uploadProfileImage(file).subscribe({
          next: (res: { message: string, url: string }) => {
            this.profileImgUrl = res.url
            this.toastr.success("Profile uploaded successfully")
            this.userForm.patchValue({ profile: this.profileImgUrl })
          }
        })
      }
    } catch (error) { throw error }
  }
  public submitUserForm(event: Event): void {
    event.stopPropagation()
    try {
      const userId = localStorage.getItem('userId')!
      if (userId && this.userForm.valid) {
        const formValue = {
          ...this.userForm.value,
          mobile: String(this.userForm.value.mobile)
        };
        this.apiService.updateUserById(userId, formValue).subscribe({
          next: (res: { message: string, data: LoginUserData }) => {
            this.toastr.success(res.message)
            this.getUserDetails()
            this.isUserEdit = false
            this.profileImgUrl = null
          }, error: () => {
            this.toastr.warning("Failed to update the user")
          }
        })
      }
    } catch (error) { throw error }
  }

  public closeDialog(event: string) {
    this.showDeleteCnfirmation = false
    if (event !== 'rejected') this.closeProfile.emit();

  }
}