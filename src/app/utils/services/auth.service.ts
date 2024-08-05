import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface User {
  name: string;
  email: string;
  password: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = true;
  private authToken: string | null = null;
  private apiUrl = 'https://669113eb26c2a69f6e8e56e3.mockapi.io/api/users'; // Mock API endpoint

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          this.setSession(user.token);
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }),
      catchError(this.handleError)
    );
  }

  signUp(email: string, password: string): Observable<boolean> {
    return this.http.post<User>(this.apiUrl, { email, password }).pipe(
      map((user) => {
        if (user.token) {
          this.setSession(user.token);
          this.router.navigate(['/home']);
          return true;
        }
        return false;
      }),
      catchError(this.handleError)
    );
  }

  forgotPassword(
    email: string
  ): Observable<{ success: boolean; message: string }> {
    const forgotPasswordEndpoint = `${this.apiUrl}/forgot-password`;
    return this.http
      .post<{ success: boolean; message: string }>(forgotPasswordEndpoint, {
        email,
      })
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string | null {
    return this.authToken;
  }

  private setSession(token: string): void {
    this.isAuthenticated = true;
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  private clearSession(): void {
    this.isAuthenticated = false;
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? `Error: ${error.error.message}`
        : `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(() => new Error(errorMessage));
  }
}
