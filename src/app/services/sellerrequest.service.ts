import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerRequest } from '../classes/seller-request';

@Injectable({
  providedIn: 'root'
})
export class SellerrequestService {

  private baseUrl  = 'http://localhost:8080/api/v1/seller'
  constructor(private http:HttpClient) { }

  requestSeller(seller:SellerRequest,profile:File,document:File){

    let formdata = new FormData()
    formdata.append('seller',JSON.stringify(seller))
    formdata.append('profilePicture',profile)
    formdata.append('document',document)

    return this.http.post(`${this.baseUrl}/request`,formdata,{responseType:'text'})
  }

  getPendingRequest(){
    return this.http.get(`${this.baseUrl}/pending`)
  }
}
