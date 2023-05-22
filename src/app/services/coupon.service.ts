import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../classes/coupon';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private URL = `${environment.apiBaseUrl}/${environment.coupon}`
  constructor(private http:HttpClient) { }

  getCouponByByName(name:string){

    return this.http.get(`${this.URL}/name/${name}`,{
      observe:'body'
    })
  }

  saveCoupon(coupon:Coupon){

    return this.http.post(`${this.URL}/save`,coupon,{
      observe:'body'
    })
  }
  getAllCoupons(){
    return this.http.get(`${this.URL}/all`,{
      observe:'body'
    })
  }

  deleteCoupon(id:string){
   return  this.http.delete(`${this.URL}/${id}`)
  }



}
