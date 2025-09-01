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
    console.log('Testing auth first...');
    this.bugService.testAuth().subscribe({
      next: (data) => {
        console.log('Auth test successful:', data);
        this.fetchBugs();
      },
      error: (err) => {
        console.error('Auth test failed:', err);
        alert('Authentication failed. Please login again.');
      }
    });
  }

  fetchBugs(): void {
    console.log('Fetching bugs...');
    this.bugService.getBugs().subscribe({
      next: (data) => {
        console.log('Bugs fetched:', data);
        this.bugs = data;
      },
      error: (err) => {
        console.error('Failed to load bugs:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error details:', err.error);
        alert('Failed to load bugs: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}
