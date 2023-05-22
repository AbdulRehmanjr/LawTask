import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class UserdashboardService {


  private URL = `${environment.apiBaseUrl}/${environment.userdashboard}`
  constructor(private http:HttpClient) { }

  getUserInfo(id:string){
    return this.http.get(`${this.URL}/${id}`,{
      observe:'body'
    })
  }
}
