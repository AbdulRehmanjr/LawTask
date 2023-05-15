import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerRequest } from '../classes/seller-request';

@Injectable({
  providedIn: 'root'
})
export class SellerrequestService {

  private baseUrl  = 'http://localhost:8080/api/v1/sellerrequest'
  constructor(private http:HttpClient) { }

  requestSeller(seller:SellerRequest,document:File){

    let formdata = new FormData()
    formdata.append('seller',JSON.stringify(seller))
    formdata.append('document',document)

    return this.http.post(`${this.baseUrl}/request`,formdata,{responseType:'text'})
  }

  getSellserBySellerId(sellerId:string){
    return this.http.get(`${this.baseUrl}/${sellerId}`,{observe:'body'})
  }
  getSellerByUserId(userId:string){
    return this.http.get(`${this.baseUrl}/user/${userId}`,{observe:'body'})
  }
  getPendingRequest(){
    return this.http.get(`${this.baseUrl}/pending`)
  }

  acceptRequestBySellerId(sellerId:string){

    return this.http.post(`${this.baseUrl}/accept/${sellerId}`,{observe:'body'})
  }
}
