import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {

  private URL = `${environment.apiBaseUrl}/${environment.freelancerUrl}`
  constructor(private http:HttpClient) { }


  getTopFreeLancers(){
    return this.http.get(`${this.URL}/top`,{
      observe:'body'
    })
  }
}
