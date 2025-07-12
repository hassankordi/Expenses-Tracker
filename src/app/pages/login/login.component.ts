import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
      console.log('Form Submitted!', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
  constructor(private router: Router) { }
}
