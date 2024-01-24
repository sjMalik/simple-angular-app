import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3001/api/todos';

  constructor(private http: HttpClient, private router: Router) { }

  create(title: string) {
    return this.http.post<any>(`${this.apiUrl}`, { title }).pipe(
      tap(response => {
        return response;
      },
        error => {
          return error;
        }
      )
    )
  }

  list() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      tap(response => {
        return response;
      },
        error => {
          return error;
        }
      )
    )
  }
}
