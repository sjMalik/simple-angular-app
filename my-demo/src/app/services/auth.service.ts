import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001'; // Replace with your login API endpoint

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/api/login`, { email, password }).pipe(
      tap(response => {
        // Assuming the API returns a JWT token upon successful login
        const token = response.token;

        // Store token in local storage
        if (token) {
          localStorage.setItem('token', token);
          this.toastr.success('Login Successful!', 'Success');
        }
      })
    );
  }

  logout() {
    // Remove token from local storage on logout
    localStorage.removeItem('token');
    // Additional: Perform any other logout-related tasks
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // Check if token exists in local storage
    return !!this.getToken();
  }
}
