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
  assignedToUserId?: number;
  assignedToUserName?: string;
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

export interface User {
  id: number;
  username: string;
  role: string;
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

  createBug(bug: Omit<Bug, 'id' | 'createdOn'>): Observable<Bug> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.post<Bug>(this.apiURL, bug, options);
  }

  updateBug(id: number, bug: Omit<Bug, 'id' | 'createdOn'>): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.put(`${this.apiURL}/${id}`, bug, options);
  }

  getBugById(id: number): Observable<Bug> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.get<Bug>(`${this.apiURL}/${id}`, options);
  }

  deleteBug(id: number): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.delete(`${this.apiURL}/${id}`, options);
  }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.get<User[]>('https://localhost:7028/api/User', options);
  }

  assignBug(bugId: number, userId: number): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.patch(`${this.apiURL}/${bugId}/assign`, { assignedToUserId: userId }, options);
  }

  testAuth(): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.get(`${this.apiURL}/me`, options);
  }
}
