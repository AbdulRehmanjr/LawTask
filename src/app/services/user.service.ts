import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = `${environment.apiBaseUrl}/${environment.user}`
  constructor(private http:HttpClient) { }

  getUserById(userId:string){

    return this.http.get(`${this.URL}/${userId}`,{observe:'body'})
  }
}
