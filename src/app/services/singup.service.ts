import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  private baseUrl = 'http://localhost:8080/api/v1/user'
  constructor(
    private _http:HttpClient
  ) { }

  saveUser(user:User,file:File){
    const formData = new FormData()
    formData.append('file', file)
    formData.append('user',JSON.stringify(user))

    return this._http.post(`${this.baseUrl}/register`, formData,{observe:'body'})
  }
  saveAdmin(user:User,file:File){
    const formData = new FormData()
    formData.append('file', file)
    formData.append('user',JSON.stringify(user))

    return this._http.post(`${this.baseUrl}/register/admin`, formData,{responseType:'text'})
  }

}
