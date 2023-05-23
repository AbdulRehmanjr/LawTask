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


  private subs = `${environment.apiBaseUrl}/${environment.subscription}`
  constructor(private http: HttpClient) { }

  paymentIntent(order:Order) {

   return  this.http.post(`${this.url}/project`, order, {
      observe: 'body',
      responseType: 'text'
    })
  }
  deleteSubscription(email:string){

    return this.http.post(`${this.url}/cancel/${email}`,{},{
      observe:'body',
      responseType:'text'
    })
  }

  getSubscription(email:string){
    return this.http.get(`${this.subs}/info/${email}`,{
      observe:'body'
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
