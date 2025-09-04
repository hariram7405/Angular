import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h2>Access Restricted</h2>
      <p>This page is only available to Admin users.</p>
      <a routerLink="/dashboard" style="color: blue; text-decoration: underline;">Go to Dashboard</a>
    </div>
  `
})
export class UnauthorizedComponent {}
