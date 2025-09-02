import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    role: ''
  };

  confirmPassword = '';
  isLoading = false;
  private auth = inject(AuthService);

  constructor(private router: Router) {}

  onSubmit() {
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    this.isLoading = true;
    
    this.auth.register(this.user.username, this.user.password, this.user.role).subscribe({
      next: (response) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Registration error:', err);
        let errorMessage = 'Registration failed. Please try again.';
        
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
        
        alert('Registration failed: ' + errorMessage);
        this.isLoading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}