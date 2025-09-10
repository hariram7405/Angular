import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { BugService, Project, User } from '../../services/bugservice';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-new-bug',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, InputTextModule, InputTextareaModule, DropdownModule],
  templateUrl: './new-bug.html',
  styleUrl: './new-bug.css'
})
export class NewBugComponent implements OnInit {
  bug = {
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
    projectId: 0,
    assignedToUserId: undefined as number | undefined
  };

  projects: Project[] = [];
  users: User[] = [];
  loading = false;
  isEditMode = false;
  bugId: number | null = null;



  priorityOptions = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ];

  constructor(private bugService: BugService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProjects();
    if (this.isAdmin()) {
      this.loadUsers();
    }
    this.checkEditMode();
  }

  checkEditMode(): void {
    this.bugId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bugId) {
      this.isEditMode = true;
      this.loadBugData();
    }
  }

  loadBugData(): void {
    if (this.bugId) {
      this.bugService.getBugById(this.bugId).subscribe({
        next: (bug) => {
          this.bug = {
            title: bug.title,
            description: bug.description,
            status: bug.status,
            priority: bug.priority,
            projectId: bug.projectId,
            assignedToUserId: bug.assignedToUserId
          };
        },
        error: (err) => console.error('Failed to load bug:', err)
      });
    }
  }

  loadProjects(): void {
    this.bugService.getProjects().subscribe({
      next: (projects) => this.projects = projects,
      error: (err) => console.error('Failed to load projects:', err)
    });
  }

  loadUsers(): void {
    this.bugService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error('Failed to load users:', err)
    });
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'Admin';
  }

  onSubmit(): void {
    if (!this.bug.title || !this.bug.description || !this.bug.projectId) {
      alert('Please fill in all required fields');
      return;
    }

    this.loading = true;
    
    if (this.isEditMode && this.bugId) {
      this.bugService.updateBug(this.bugId, this.bug).subscribe({
        next: () => {
          this.loading = false;
          alert('Bug updated successfully!');
          this.router.navigate(['/bugs']);
        },
        error: (err) => {
          this.loading = false;
          console.error('Failed to update bug:', err);
          alert('Failed to update bug: ' + (err.error?.message || err.message || 'Unknown error'));
        }
      });
    } else {
      this.bugService.createBug(this.bug).subscribe({
        next: () => {
          this.loading = false;
          alert('Bug reported successfully!');
          this.router.navigate(['/bugs']);
        },
        error: (err) => {
          this.loading = false;
          console.error('Failed to create bug:', err);
          alert('Failed to report bug: ' + (err.error?.message || err.message || 'Unknown error'));
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/bugs']);
  }
}