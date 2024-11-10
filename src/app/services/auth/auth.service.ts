import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7139/api';  // Update with your API URL

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;  // Returns true if token exists, otherwise false
  }

  // Save the JWT token
  public saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Get the JWT token
  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Remove token on logout
  public logout(): void {
    localStorage.removeItem('auth_token');
  }

  // User registration
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/register`, user);
  }

  // User login and token storage
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/login`, credentials).pipe(
      tap((response: any) => {
        // Save the JWT token in localStorage
        localStorage.setItem("auth_token", response.token);
      })
    );
  }

  // Get the user's profile 
  getProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(`${this.apiUrl}/users/profile`, { headers });
  }

  // Update the user's profile 
  updateProfile(profile: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.put(`${this.apiUrl}/users/profile`, profile, { headers });
  }
}

