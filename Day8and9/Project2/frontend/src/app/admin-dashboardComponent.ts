import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { BugService, BugStats } from './services/bugservice';
import { AuthService } from './services/authservice';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CardModule, ButtonModule, ChartModule, CommonModule],
  templateUrl: './admin-dashboardComponent.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  isAdmin = false;
  stats: BugStats | null = null;
  pieData: any;
  barData: any;
  doughnutData: any;
  projectData: any;
  assignmentData: any;
  chartOptions: any;
  projectNames: { [key: number]: string } = {};
  users: any[] = [];
  highPriorityCount = 0;
  unassignedCount = 0;
  totalUsers = 0;

  constructor(private bugService: BugService, private authService: AuthService) {}

  ngOnInit() {
    const userRole = this.authService.getUserRole();
    console.log('User role:', userRole);
    this.isAdmin = userRole === 'Admin';
    console.log('Is admin:', this.isAdmin);
    if (this.isAdmin) {
      this.loadProjects();
      this.loadUsers();
      // Load stats after projects are loaded
      setTimeout(() => this.loadStats(), 500);
    }
  }

  loadProjects() {
    this.bugService.getProjects().subscribe({
      next: (projects: any) => {
        console.log('Loaded projects:', projects);
        this.projectNames = {};
        projects.forEach((project: any) => {
          this.projectNames[project.id] = project.name;
        });
        console.log('Project names mapping:', this.projectNames);
      },
      error: (err: any) => console.error('Error loading projects:', err)
    });
  }

  loadUsers() {
    this.authService.getUsers().subscribe({
      next: (users: any) => {
        this.users = users;
        this.totalUsers = users.length;
      },
      error: (err: any) => console.error('Error loading users:', err)
    });
  }

  loadStats() {
    this.bugService.getBugs().subscribe({
      next: (bugs: any) => {
        console.log('Loaded bugs:', bugs);
        this.calculateStats(bugs);
        this.setupCharts();
      },
      error: (err: any) => console.error('Error loading bugs:', err)
    });
  }

  calculateStats(bugs: any[]) {
    const openCount = bugs.filter(b => b.status === 'Open').length;
    const closedCount = bugs.filter(b => b.status === 'Closed').length;
    
    const statusCounts: any = {};
    const priorityCounts: any = {};
    const projectCounts: any = {};
    const assignedCounts: any = {};
    
    this.highPriorityCount = bugs.filter(b => b.priority === 'High').length;
    this.unassignedCount = bugs.filter(b => !b.assignedToUserId).length;
    
    bugs.forEach(bug => {
      statusCounts[bug.status] = (statusCounts[bug.status] || 0) + 1;
      priorityCounts[bug.priority] = (priorityCounts[bug.priority] || 0) + 1;
      projectCounts[bug.projectId] = (projectCounts[bug.projectId] || 0) + 1;
      const assignee = bug.assignedToUserId ? 'Assigned' : 'Unassigned';
      assignedCounts[assignee] = (assignedCounts[assignee] || 0) + 1;
    });
    
    this.stats = {
      openVsResolved: { open: openCount, resolved: closedCount },
      bugsByProject: projectCounts,
      bugsByStatus: statusCounts,
      bugsByPriority: priorityCounts,
      bugsByAssigned: assignedCounts,
      totalBugs: bugs.length,
      pendingBugs: bugs.filter(b => b.status !== 'Closed').length
    };
  }

  setupCharts() {
    if (!this.stats) {
      console.log('No stats available for charts');
      return;
    }

    console.log('Setting up charts with stats:', this.stats);

    this.pieData = {
      labels: ['Open', 'Closed'],
      datasets: [{
        data: [this.stats.openVsResolved.open, this.stats.openVsResolved.resolved],
        backgroundColor: ['#e74c3c', '#27ae60'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };

    this.barData = {
      labels: Object.keys(this.stats.bugsByStatus),
      datasets: [{
        label: 'Bugs by Status',
        data: Object.values(this.stats.bugsByStatus),
        backgroundColor: ['#3498db', '#f39c12', '#27ae60', '#e74c3c'],
        borderRadius: 8,
        borderSkipped: false
      }]
    };

    this.doughnutData = {
      labels: Object.keys(this.stats.bugsByPriority),
      datasets: [{
        data: Object.values(this.stats.bugsByPriority),
        backgroundColor: ['#e74c3c', '#f39c12', '#2ecc71'],
        borderWidth: 3,
        borderColor: '#fff'
      }]
    };

    this.projectData = {
      labels: Object.keys(this.stats.bugsByProject).map(id => {
        const projectName = this.projectNames[+id];
        return projectName || `Project ${id}`;
      }),
      datasets: [{
        label: 'Bugs by Project',
        data: Object.values(this.stats.bugsByProject),
        backgroundColor: ['#9b59b6', '#34495e', '#16a085', '#f39c12', '#e67e22'],
        borderRadius: 8
      }]
    };

    this.assignmentData = {
      labels: Object.keys(this.stats.bugsByAssigned),
      datasets: [{
        label: 'Bugs by Assignment',
        data: Object.values(this.stats.bugsByAssigned),
        backgroundColor: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
        borderRadius: 8
      }]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    console.log('Charts setup complete');
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
