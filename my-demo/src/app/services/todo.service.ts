import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3001/api/todos'; // Replace with your login API endpoint

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  create(title: string) {
    return this.http.post<any>(`${this.apiUrl}`, { title }).pipe(
      tap(response => {
        if (response?._id) {
          this.toastr.success('Todo Creation Successful!', 'Success');
        }
      },
        error => {
          this.toastr.error(error?.error?.message ? error?.error?.message : 'Todo Creation Failed !', 'Error')
        }
      )
    );
  }

  list() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      tap(response => {
        return response;
      },
        error => {
          return throwError(error);
        }
      )
    );
  }
}
