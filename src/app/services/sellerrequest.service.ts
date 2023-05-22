import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerRequest } from '../classes/seller-request';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class SellerrequestService {

  private URL  = `${environment.apiBaseUrl}/${environment.sellerRequest}`
  constructor(private http:HttpClient) { }

  requestSeller(seller:SellerRequest,document:File){

    let formdata = new FormData()
    formdata.append('seller',JSON.stringify(seller))
    formdata.append('document',document)

    return this.http.post(`${this.URL}/request`,formdata,{responseType:'text'})
  }

  getSellserBySellerId(sellerId:string){
    return this.http.get(`${this.URL}/${sellerId}`,{observe:'body'})
  }
  getSellerByUserId(userId:string){
    return this.http.get(`${this.URL}/user/${userId}`,{observe:'body'})
  }
  getPendingRequest(){
    return this.http.get(`${this.URL}/pending`)
  }
  getApprovedRequests(){
    return this.http.get(`${this.URL}/accepted`)
  }

  acceptRequestBySellerId(sellerId:string){

    return this.http.post(`${this.URL}/accept/${sellerId}`,{observe:'body'})
  }
  updateRequestSeller(seller:SellerRequest,document:File){

    let formdata = new FormData()

    formdata.append('seller',JSON.stringify(seller))
    formdata.append('document',document)

    return this.http.post(`${this.URL}/update`,formdata,{responseType:'text'})
  }
  rejectRequestBySellerId(sellerId:string,remarks:string){
    return this.http.post(`${this.URL}/reject/${sellerId}`,remarks,{
      observe:'body'
    })
  }
}
