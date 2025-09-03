import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdOn: Date;
  projectId: number;
}

export interface BugFilter {
  status?: string;
  priority?: string;
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: "root" })
export class BugService {
  private apiURL = "https://localhost:7028/api/Bug";

  constructor(private http: HttpClient) {}

  getBugs(): Observable<Bug[]> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    
    return this.http.get<Bug[]>(this.apiURL, options).pipe(
      catchError((err) => {
        console.error("Error fetching bugs", err);
        return throwError(() => err);
      })
    );
  }

  getProjects(): Observable<Project[]> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.get<Project[]>('https://localhost:7028/api/Project', options);
  }

  testAuth(): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.get(`${this.apiURL}/me`, options);
  }
}
