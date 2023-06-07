import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';
import { WithDraw } from '../classes/withdraw';

@Injectable({
  providedIn: 'root'
})
export class WithdrawService {

  private url = `${environment.apiBaseUrl}/${environment.withdraw}`
  constructor(private http:HttpClient) { }

  saveWithDraw(withDraw:WithDraw){
    return this.http.post(`${this.url}/create`,withDraw,{
      observe:'body'
    })
  }
  getWithDrawHistory(userId:string){
     return this.http.get(`${this.url}/${userId}`,{
      observe:'body'
    })
  }
  getAllWithDraw(){
    return this.http.get(`${this.url}/all`,{
      observe:'body'
    })
  }
  updateWithDraw(withDraw:WithDraw){
    return this.http.post(`${this.url}/update`,withDraw,{
      observe:'body'
    })
  }

  getCount(){
    return this.http.get(`${this.url}/count`,{
      observe:'body'
    })
  }
}
