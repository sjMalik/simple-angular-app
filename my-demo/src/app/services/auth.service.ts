import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/api/login`, { email, password }).pipe(
      tap(response => {
        const token = response.token;

        // Store token in local storage
        if (token) {
          localStorage.setItem('token', token);
          this.toastr.success('Login Successful', 'Success')
        }
      })
    )
  }
}
