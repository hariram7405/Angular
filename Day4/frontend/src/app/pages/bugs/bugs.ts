import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BugService, Bug } from '../../services/bugservice';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.css'
})
export class BugsComponent implements OnInit {
  bugs: Bug[] = [];

  constructor(private bugService: BugService) {}

 ngOnInit(): void {
    console.log('Fetching bugs...');
    this.bugService.getBugs().subscribe({
      next: (data) => {
        console.log('Bugs fetched:', data);
        this.bugs = data;
      },
      error: (err) => {
        console.error('Failed to load bugs:', err);
        console.error('Error details:', err.error);
      }
    });
  }
}
