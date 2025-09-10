import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = 'https://localhost:7028/api/auth'; 
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
    const loginData = { UserName: username, Password: password };
    return this.http.post<any>(this.loginURL, loginData, this.httpOptions).pipe(
      catchError((err) => {
        
        if (err.status === 0) {
          return throwError(() => ({ error: 'Cannot connect to server. Please ensure the backend is running on port 7028.' }));
        }
        return throwError(() => err);
      })
    );
  }

  // 🔹 Register
  register(username: string, password: string, role: string): Observable<any> {
    const registerData = { Username: username, Password: password, Role: role };
    return this.http.post<any>(this.registerURL, registerData, this.httpOptions).pipe(
      catchError((err) => {
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
  
 getUserRole(): string | null {
  const token = this.token;
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role || null;
  } catch (error) {
    return null;
  }
}


  // 🔹 4. Get token
  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 🔹 Get all users
  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<User[]>(`${this.baseURL}/users`, { headers }).pipe(
      catchError((err) => {
        console.error('Error fetching users:', err);
        return throwError(() => err);
      })
    );
  }
}
