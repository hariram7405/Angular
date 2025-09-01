import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, InputTextModule, CheckboxModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value as { username: string; password: string };
      
      this.auth.login(username, password).subscribe({
        next: (response) => {
          if (response.token) {
            this.auth.storeToken(response.token);
            this.router.navigate(['/dashboard']);
          }
          this.isLoading = false;
        },
        error: (err: any) => {
          alert('Login failed: ' + (err.error?.message || 'Invalid credentials'));
          this.isLoading = false;
        }
      });
    }
  }

  testClick() {
    alert('Component is responding!');
  }
}