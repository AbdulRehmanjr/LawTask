import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';
import { PaymentRequest } from '../classes/paymentrequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = `${environment.apiBaseUrl}${environment.paymentUrl}`

  constructor(private http: HttpClient) { }

  paymentIntent(payementRequest: PaymentRequest) {
    console.log(payementRequest)
   return  this.http.post(this.url, payementRequest, {
      observe: 'body',
      responseType: 'text'
    })
  }
  paymentConfirm(type:string,email:string){

    let payment = new PaymentRequest()
    payment.email = email
    payment.type = type

    return this.http.post(`${this.url}create-checkout-session`,payment,{
      observe:'body',
      responseType:'text'
    })
  }
}
