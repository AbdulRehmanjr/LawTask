import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://localhost:8080/api/v1/user'
  constructor(private http:HttpClient) { }

  getUserById(userId:string){

    return this.http.get(`${this.URL}/${userId}`,{observe:'body'})
  }
}
