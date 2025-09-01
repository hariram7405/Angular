import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, InputTextModule, CheckboxModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.username && this.password) {
      this.isLoading = true;
      
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.isLoading = false;
          alert('Login failed! Try admin/password');
        }
      });
    }
  }
}
