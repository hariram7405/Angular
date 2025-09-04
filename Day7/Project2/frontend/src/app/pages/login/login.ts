import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, InputTextModule, CheckboxModule, ReactiveFormsModule],
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
          console.log('Login response:', response);
          // Login successful - redirect to dashboard
          if (response && (response.Token || response.token)) {
            this.auth.storeToken(response.Token || response.token);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('No token in response:', response);
            alert('Login failed: No token received. Response: ' + JSON.stringify(response));
          }
          this.isLoading = false;
        },
        error: (err: any) => {
          // Login failed - stay on login page
          console.error('Login error:', err);
          let errorMessage = 'Invalid credentials';
          
          if (err.status === 0) {
            errorMessage = 'Cannot connect to server. Please check if backend is running.';
          } else if (err.error?.Message) {
            errorMessage = err.error.Message; // Backend returns 'Message' with capital M
          } else if (err.error?.message) {
            errorMessage = err.error.message;
          } else if (err.error?.errors) {
            const errors = Object.values(err.error.errors).flat();
            errorMessage = errors.join(', ');
          } else if (typeof err.error === 'string') {
            errorMessage = err.error;
          }
          
          alert('Login failed: ' + errorMessage);
          this.isLoading = false;
        }
      });
    } else {
      // Form invalid - mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  testClick() {
    alert('Component is responding!');
  }
}