import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [MessageService]
})
export class SigninComponent {
  public isForgotScreen: boolean = false
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, public route: Router, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  // Helper method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean | undefined {
    const control = this.loginForm.get(fieldName);
    return control?.invalid && (control.dirty || control.touched);
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
          this.route.navigate(['/feature'])
          this.messageService.add({ severity: 'success', detail: "Login successfully", summary: 'Success' })
          this.loginForm.reset()
        }, error: (err: HttpErrorResponse) => {
          this.messageService.add({ severity: 'warn', detail: err.error?.message, summary: 'Warning' })
        }
      })
    } catch (error) { throw error }
  }

  // Forgot form submit
  public onForgotformSubmit(forgot: NgForm) {
    console.log(forgot.value);

  }
}
