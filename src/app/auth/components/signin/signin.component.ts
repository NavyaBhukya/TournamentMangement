import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,public route: Router) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email], // Email validation
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)], // Password validation
      ],
    });
  }

  // Helper method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean | undefined {
    const control = this.loginForm.get(fieldName);
    return control?.invalid && (control.dirty || control.touched);
  }
  onsubmitForm() {
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.login(payload).subscribe((data) => {
      console.log('logged in succefully');
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      this.route.navigate(['/features'])
      this.loginForm.reset()

    })
  }
}
