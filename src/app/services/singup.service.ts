import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  private baseUrl = `${environment.apiBaseUrl}/${environment.signup}`
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
