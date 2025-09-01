import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = 'https://localhost:7028/api/auth'; // Updated to match backend
  private loginURL = `${this.baseURL}/login`;
  private registerURL = `${this.baseURL}/register`;
  private tokenKey = 'jwt_token';
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // 🔹 1. Login
  login(username: string, password: string): Observable<any> {
    const loginData = { UserName: username, Password: password }; // Match backend DTO
    console.log('Attempting login with:', loginData);
    return this.http.post<any>(this.loginURL, loginData, this.httpOptions).pipe(
      tap(response => console.log('Login response:', response)),
      catchError((err) => {
        console.error('Login failed', err);
        if (err.status === 0) {
          return throwError(() => ({ error: 'Cannot connect to server. Please ensure the backend is running on port 7028.' }));
        }
        return throwError(() => err);
      })
    );
  }

  // 🔹 Register
  register(username: string, password: string, role: string): Observable<any> {
    const registerData = { Username: username, Password: password, Role: role }; // Match backend DTO
    console.log('Attempting registration with:', registerData);
    return this.http.post<any>(this.registerURL, registerData, this.httpOptions).pipe(
      tap(response => console.log('Registration response:', response)),
      catchError((err) => {
        console.error('Registration failed', err);
        if (err.status === 0) {
          return throwError(() => ({ error: 'Cannot connect to server. Please ensure the backend is running on port 7028.' }));
        }
        return throwError(() => err);
      })
    );
  }

  // 🔹 Store JWT token
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loggedInSubject.next(true);
  }

  // 🔹 2. Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInSubject.next(false);
  }

  // 🔹 3. Check login status
  isLoggedIn(): boolean {
    return this.token !== null;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  private hasToken(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  // 🔹 4. Get token
  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
