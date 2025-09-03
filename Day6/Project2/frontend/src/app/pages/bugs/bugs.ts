import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BugService, Bug, BugFilter, Project } from '../../services/bugservice';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, FormsModule, DropdownModule, InputTextModule, TableModule, TagModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.css'
})
export class BugsComponent implements OnInit {
  bugs: Bug[] = [];
  loading = false;
  
  statusOptions = [
    { label: 'All Status', value: null },
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Closed', value: 'Closed' }
  ];
  
  priorityOptions = [
    { label: 'All Priority', value: null },
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ];
  
  selectedStatus: string | null = null;
  selectedPriority: string | null = null;
  selectedProject: number | null = null;
  dateFrom: string = '';
  dateTo: string = '';
  showRecentOnly: boolean = false;
  
  projects: Project[] = [];
  projectNames: { [key: number]: string } = {};
  
  sortOptions = [
    { label: 'Newest First', value: { field: 'createdOn', order: -1 } },
    { label: 'Oldest First', value: { field: 'createdOn', order: 1 } },
    { label: 'Highest Priority', value: { field: 'priority', order: -1 } },
    { label: 'Title A-Z', value: { field: 'title', order: 1 } }
  ];
  selectedSort: any = this.sortOptions[0].value;

  constructor(private bugService: BugService) {}

 ngOnInit(): void {
    this.fetchProjects();
    this.fetchBugs();
  }

  fetchBugs(): void {
    this.loading = true;
    
    this.bugService.getBugs().subscribe({
      next: (data) => {
        this.bugs = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load bugs:', err);
        this.loading = false;
        
        if (err.status === 401) {
          alert('Authentication required. Please login.');
        } else if (err.status === 403) {
          alert('Access denied. You do not have permission to view bugs.');
        } else {
          alert('Failed to load bugs: ' + (err.error?.message || err.message || 'Unknown error'));
        }
      }
    });
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

  onRecentToggle(): void {
    if (this.showRecentOnly) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      this.dateFrom = sevenDaysAgo.toISOString().split('T')[0];
      this.dateTo = new Date().toISOString().split('T')[0];
    } else {
      this.dateFrom = '';
      this.dateTo = '';
    }
  }

  resetFilters(): void {
    this.selectedStatus = null;
    this.selectedPriority = null;
    this.selectedProject = null;
    this.dateFrom = '';
    this.dateTo = '';
    this.showRecentOnly = false;
  }

  fetchProjects(): void {
    this.bugService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        projects.forEach(project => {
          this.projectNames[project.id] = project.name;
        });
      },
      error: (err) => console.error('Failed to load projects:', err)
    });
  }

  getProjectName(projectId: number): string {
    return this.projectNames[projectId] || `Project ${projectId}`;
  }
}
