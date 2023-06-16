import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { DeferModule } from 'primeng/defer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerService } from './interceptor/spinner.service';
import { RequestInterceptor } from './interceptor/request.interceptor';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DeferModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },

  ],
  exports: [
    DeferModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
