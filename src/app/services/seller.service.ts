import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../classes/seller';
import { CardSubscription } from '../classes/subscription';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private baseUrl = `${environment.apiBaseUrl}/${environment.seller}`
  constructor(private http:HttpClient) { }

  saveJob(){

  }
  updateSubscription(data:CardSubscription){
    return this.http.post(`${this.baseUrl}/subscribe`,data,{
      observe:'body'
    })
  }
  getSeller(userId:string){
    return this.http.get(`${this.baseUrl}/${userId}`,{observe:'body'})
  }
}
