import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { BugService, Bug } from './services/bugservice';
import { AuthService } from './services/authservice';

@Component({
  selector: 'app-bug-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, InputTextareaModule, InputTextModule, TagModule],
  templateUrl: './bug-detail.component.html',
  styleUrl: './bug-detail.component.css'
})
export class BugDetailComponent implements OnInit {
  bug: Bug | null = null;
  comments: any[] = [];
  newComment = { author: '', message: '' };
  projectNames: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bugService: BugService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadBug(id);
      this.loadComments(id);
      this.newComment.author = this.getCurrentUsername();
    }
    this.loadProjects();
  }

  loadBug(id: number) {
    this.bugService.getBugById(id).subscribe({
      next: (bug) => this.bug = bug,
      error: (err) => console.error('Error loading bug:', err)
    });
  }

  loadComments(bugId: number) {
    this.comments = [];
  }

  loadProjects() {
    this.bugService.getProjects().subscribe({
      next: (projects) => {
        projects.forEach(project => {
          this.projectNames[project.id] = project.name;
        });
      },
      error: (err) => console.error('Failed to load projects:', err)
    });
  }

  getCurrentUsername(): string {
    const token = this.authService.token;
    if (!token) return 'Anonymous';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || payload.name || 'User';
    } catch {
      return 'User';
    }
  }

  addComment() {
    if (this.newComment.message.trim() && this.bug) {
      const comment = {
        id: this.comments.length + 1,
        author: this.getCurrentUsername(),
        message: this.newComment.message,
        createdAt: new Date()
      };
      this.comments.push(comment);
      this.newComment = { author: '', message: '' };
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Open': return 'danger';
      case 'In Progress': return 'warning';
      case 'Closed': return 'success';
      default: return 'info';
    }
  }

  getPrioritySeverity(priority: string) {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'info';
    }
  }

  getProjectName(projectId: number): string {
    return this.projectNames[projectId] || `Project ${projectId}`;
  }

  goBack() {
    this.router.navigate(['/bugs']);
  }
}