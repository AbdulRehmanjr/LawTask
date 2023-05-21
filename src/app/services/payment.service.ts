import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';
import { PaymentRequest } from '../classes/paymentrequest';
import { Order } from '../classes/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = `${environment.apiBaseUrl}/${environment.paymentUrl}`

  constructor(private http: HttpClient) { }

  paymentIntent(order:Order) {

   return  this.http.post(`${this.url}/project`, order, {
      observe: 'body',
      responseType: 'text'
    })
  }

  paymentConfirm(type:string,email:string){

    let payment = new PaymentRequest()
    payment.email = email
    payment.type = type

    return this.http.post(`${this.url}/create-checkout-session`,payment,{
      observe:'body',
      responseType:'text'
    })
  }
}
