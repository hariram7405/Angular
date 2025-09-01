import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

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

  onLogin() {
    if (this.username && this.password) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Login attempt:', { 
          username: this.username, 
          password: this.password, 
          rememberMe: this.rememberMe 
        });
        this.isLoading = false;
        // Add your authentication logic here
      }, 1500);
    }
  }
}
