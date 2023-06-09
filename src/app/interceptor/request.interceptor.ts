import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const maxFileSize = 50 * 1024 * 1024; // 50 MB
    const maxRequestSize = 50 * 1024 * 1024; // 50 MB

    const token = localStorage.getItem('token');
    const content = token?.substring(1, token.length - 1);

    const modifiedRequest = request.clone({
      headers: new HttpHeaders(),
      reportProgress: true,
      setHeaders: {
        'Max-Body-Length': maxFileSize.toString(),
        'Max-Content-Length': maxRequestSize.toString(),
        'Authorization' : `Bearer ${content}`
      }
    });

    return next.handle(modifiedRequest);
  }
}
