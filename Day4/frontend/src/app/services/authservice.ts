import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiURL = 'http://localhost:7028/api/Auth/login';
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  // 🔹 1. Login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiURL, { username, password }).pipe(
      catchError((err) => {
        console.error('Login failed', err);
        return throwError(() => new Error('Invalid credentials'));
      })
    );
  }

  // 🔹 2. Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // 🔹 3. Check login status
  isLoggedIn(): boolean {
    return this.token !== null;
  }

  // 🔹 4. Get token
  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
