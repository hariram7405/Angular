import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';

import { MenuItem } from 'primeng/api';
import { AuthService } from './services/authservice';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CardModule,
    MenubarModule,
    ButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'BugTracker';
  menuItems$: Observable<MenuItem[]>;

  constructor(private authService: AuthService, private router: Router) {
    this.menuItems$ = this.authService.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return [
            { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
            { label: 'Bugs', icon: 'pi pi-exclamation-triangle', routerLink: '/bugs' },
            { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
          ];
        } else {
          return [
            { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' },
            { label: 'Register', icon: 'pi pi-user-plus', routerLink: '/register' },
          ];
        }
      })
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
