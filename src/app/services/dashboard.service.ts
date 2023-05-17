import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private URL = `${environment.apiBaseUrl}/${environment.dashboard}`
  constructor(private http:HttpClient) { }

  getDashboardInfo(){

    return this.http.get(`${this.URL}/info`,{
      observe:'body'
    })
  }

}
