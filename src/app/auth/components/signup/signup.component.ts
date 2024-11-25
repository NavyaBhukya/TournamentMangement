import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,public route: Router,private authService:AuthService) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'), // Only digits, exactly 10
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registrationForm.get(field);
    return control?.invalid && (control.dirty || control.touched) || false;
  }

  onSubmit(): void {
    const payload = {
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      mobile: this.registrationForm.value.mobile,
      password: this.registrationForm.value.password
    }
    this.authService.userSignup(payload).subscribe((data) => {
      console.log('user registered succesfully in succefully');
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      this.route.navigate(['/features'])
      this.registrationForm.reset()

    })
  }

}
