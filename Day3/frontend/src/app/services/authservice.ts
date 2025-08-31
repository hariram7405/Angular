import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiURL = 'http://localhost:7028/api/Auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiURL, { username, password }).pipe(
      catchError((err) => {
        console.error('Login failed', err);
        return throwError(() => new Error('Invalid credentials'));
      })
    );
  }
}
