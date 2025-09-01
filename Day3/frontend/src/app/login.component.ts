import { Component } from '@angular/core';
import { AuthService } from './services/authservice';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-form">
      <h2>Login</h2>
      <form (ngSubmit)="onLogin()">
        <input [(ngModel)]="username" placeholder="Username" required>
        <input [(ngModel)]="password" type="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
      <p *ngIf="message" [class]="messageClass">{{message}}</p>
    </div>
  `,
  styles: [`
    .login-form { max-width: 400px; margin: 50px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px; }
    input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
    button { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; }
    .success { color: green; }
    .error { color: red; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';
  messageClass = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.message = 'Login successful!';
        this.messageClass = 'success';
      },
      error: () => {
        this.message = 'Login failed! Try admin/password';
        this.messageClass = 'error';
      }
    });
  }
}