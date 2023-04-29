import { Injectable } from '@angular/core';
import { Login } from '../classes/login';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/v1/token'


  constructor(private _http: HttpClient) { }



   generateToken(login: Login) {
    return this._http.post(`${this.baseUrl}` + '/generate', login, {
      responseType: 'json',
    })

  }

   setToken(token: any) {
    if (token != null) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  }

   getToken() {
    return localStorage.getItem('token');
  }

   getAuthority() {
    let user = JSON.parse(localStorage.getItem('user'))

    return user.authority;
  }

   setUser(data: any) {

    let current_user = new User();

    current_user.userId = data.userId
    current_user.email = data.email
    current_user.userName = data.userName
    current_user.authority = data.role.authority;


    localStorage.setItem('user', JSON.stringify(current_user));
  }

   currentUser(loginInfo: Login) {
    return this._http.post(`${this.baseUrl}/current-user`, loginInfo);
  }


}
