import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';
import { Order } from '../classes/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL = `${environment.apiBaseUrl}/${environment.order}`
  constructor(private http:HttpClient) { }

  confirmOrderByUser(order:Order,requirement:File){

    let formData = new FormData()

    formData.append('order',JSON.stringify(order))
    formData.append('requirement',requirement)

    return this.http.post(`${this.URL}/register-confirmed`,formData,{observe:'body'})
  }

  createOrder(order:Order){

    return this.http.post(`${this.URL}/register`,order,{
      observe:'body',
      responseType:'text'
    })
  }

  getOrderByEmail(email:string){

    return this.http.get(`${this.URL}/${email}`,{observe:'body'})
  }

  getOrderById(id:string){

    return this.http.get(`${this.URL}/${id}`,{observe:'body'})
  }
}
