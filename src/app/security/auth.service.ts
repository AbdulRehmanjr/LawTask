import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    const token = localStorage.getItem('token');

    // Clone the request and add the token as an Authorization header
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    // Pass the modified request to the next interceptor or the HTTP handler
    return next.handle(authReq);
  }
}
