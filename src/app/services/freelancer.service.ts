import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {

  private URL = `${environment.apiBaseUrl}/${environment.freelancerUrl}`
  constructor(private http: HttpClient) { }


  getTopFreeLancers() {
    return this.http.get(`${this.URL}/top`, {
      observe: 'body'
    })
  }

  getFreelancerById(id: string) {
    const params = new HttpParams().set('freelancerId', id)
    return this.http.get(`${this.URL}/search`, { params: params, observe: 'body' })
  }
  getFreelancerByUserId(userId:string){
    return this.http.get(`${this.URL}/user/${userId}`, { observe: 'body' })
  }

  rateFreeLancers(userId: string, rate: number,comment:string,orderId:string) {
    const params = new HttpParams().set('userId', userId).set("rate", rate).set('comment',comment).set('order',orderId)
    return this.http.post(`${this.URL}/rate`, {}, { params: params, observe: 'body' })
  }
}
