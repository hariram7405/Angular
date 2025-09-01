import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  createdOn: Date;
  projectId: number;
}

@Injectable({ providedIn: "root" })
export class BugService {
  private apiURL = "https://localhost:7028/api/Bug";

  constructor(private http: HttpClient) {}

  getBugs(): Observable<Bug[]> {
    const token = localStorage.getItem('jwt_token');
    console.log('Token exists:', !!token);
    console.log('Making request to:', this.apiURL);
    
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    
    return this.http.get<Bug[]>(this.apiURL, options).pipe(
      catchError((err) => {
        console.error("Error fetching bugs", err);
        console.error("Status:", err.status);
        console.error("Error body:", err.error);
        return throwError(() => err);
      })
    );
  }

  testAuth(): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const options = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
    return this.http.get(`${this.apiURL}/me`, options);
  }
}
