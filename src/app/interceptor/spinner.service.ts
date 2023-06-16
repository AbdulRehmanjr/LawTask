import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService implements HttpInterceptor {

  activeRequests = 0;

  constructor(private spinner: NgxSpinnerService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.spinner.show();
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;

        if (this.activeRequests === 0) {
          this.spinner.hide();
        }
      })
    );
  }
}
