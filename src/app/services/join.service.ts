import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class JoinService {

  private URL = `${environment.apiBaseUrl}`
  constructor(private http:HttpClient) { }

  getUsersInfo(){

    return this.http.get(`${this.URL}/${environment.userJoin}`,{
      observe:'body'
    })
  }
}
