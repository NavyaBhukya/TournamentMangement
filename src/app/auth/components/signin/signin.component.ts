import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  public isForgotScreen: boolean = false
  loginForm: FormGroup;
  public pswdVisible: boolean = false
  public passwordType: string = 'password'
  constructor(private fb: FormBuilder, private authService: AuthService, public route: Router,
    private commonServ: CommonService, private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  isFieldInvalid(fieldName: string): boolean | undefined {
    const control = this.loginForm.get(fieldName);
    return control?.invalid && (control.dirty || control.touched);
  }
  togglePasswordVisibility(): void {
    this.pswdVisible = !this.pswdVisible;
    this.passwordType = this.pswdVisible ? 'text' : 'password';
  }
  public onsubmitForm(): void {
    try {
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.authService.login(payload).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('role', data.role)
          if (data.userid) localStorage.setItem('userId', data.userid)
          this.route.navigate(['/feature'])
          this.toastr.success('Login successfully')
          this.commonServ.showHeader.emit()
          this.loginForm.reset()
        }, error: (err: HttpErrorResponse) => {
          this.toastr.warning(err.error?.message, 'Login failed')
        }
      })
    } catch (error) { throw error }
  }

  // Forgot form submit
  public onForgotformSubmit(forgot: NgForm) { }
}
