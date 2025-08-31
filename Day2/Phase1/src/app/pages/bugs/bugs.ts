import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.css'
})
export class BugsComponent {

}
