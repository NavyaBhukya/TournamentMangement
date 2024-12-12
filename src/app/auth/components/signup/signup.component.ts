import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public registrationForm: FormGroup;
  public pswdVisible: boolean = false
  public passwordType: string = 'password'
  constructor(private fb: FormBuilder, public route: Router, private authService: AuthService, private toastr: ToastrService) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.registrationForm.get(field);
    return control?.invalid && (control.dirty || control.touched) || false;
  }
  public onSubmit(): void {
    const payload = {
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      mobile: this.registrationForm.value.mobile,
      password: this.registrationForm.value.password
    }
    this.authService.userSignup(payload).subscribe({
      next: () => {
        this.toastr.success('Registration successfull')
        this.route.navigate([''])
        this.registrationForm.reset()
      }, error: (err: HttpErrorResponse) => {
        this.toastr.warning('Warning', err.error?.message)
      }
    })
  }
  togglePasswordVisibility(): void {
    this.pswdVisible = !this.pswdVisible;
    this.passwordType = this.pswdVisible ? 'text' : 'password';
  }
}
