import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  registration(email: string, password: string, firstName: string, lastName: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password, firstName, lastName }).pipe(
      tap(response => {
        if (response._id) {
          this.toastr.success('Registration Successful', 'Success');
          this.router.navigate(['/login'])
        }
      },
        error => {
          this.toastr.error(error?.error?.message ? error?.error?.message : 'Registration Failed !', 'Error')
        }
      )
    )
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        const token = response.token;

        // Store token in local storage
        if (token) {
          localStorage.setItem('token', token);
          this.toastr.success('Login Successful', 'Success');
          this.router.navigate(['/'])
        }
      },
        error => {
          console.log(error);
          this.toastr.error(error?.error?.message ? error?.error?.message : 'Login Failed !', 'Error')
        }
      )
    )
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // Check if token exist in localstorage
    return !!this.getToken();
  }

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwt_decode.jwtDecode(token);
      } catch (err) {
        console.error('Error Decoding token', err);
        return null;
      }
    }
  }

  logout() {
    // Remove token from the localstorage
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
