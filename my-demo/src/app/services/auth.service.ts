import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001'; // Replace with your login API endpoint

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  register(email: string, password: string, firstName: string, lastName: string) {
    return this.http.post<any>(`${this.apiUrl}/api/register`, { email, password, firstName, lastName }).pipe(
      tap(response => {
        console.log(response)
        if (response?._id) {
          this.toastr.success('Registration Successful! Please login now', 'Success');
          this.router.navigate(['/login']);
        }
      },
        error => {
          this.toastr.error(error?.error?.message ? error?.error?.message : 'Registration Failed !', 'Error')
        }
      )
    );
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/api/login`, { email, password }).pipe(
      tap(response => {
        // Assuming the API returns a JWT token upon successful login
        const token = response.token;

        // Store token in local storage
        if (token) {
          localStorage.setItem('token', token);
          this.toastr.success('Login Successful!', 'Success');
          this.router.navigate(['/']);
        }
      },
        error => {
          this.toastr.error(error?.error?.message ? error?.error?.message : 'Login Failed !', 'Error')
        }
      )
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // Check if token exists in local storage
    return !!this.getToken();
  }

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwt_decode.jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  logout() {
    // Remove token from local storage on logout
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
