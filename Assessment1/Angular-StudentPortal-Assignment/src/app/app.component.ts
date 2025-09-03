import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular-StudentPortal-Assignment';
  
  menuItems: MenuItem[] = [
    {
      label: 'Register Student',
      icon: 'pi pi-user-plus',
      routerLink: '/register'
    },
    {
      label: 'Student List',
      icon: 'pi pi-users',
      routerLink: '/students'
    }
  ];
}
