import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Modify headers and add authorization token
    const modifiedRequest = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    });

    // Pass the modified request to next handler
    return next.handle(modifiedRequest);
  }
}
