import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';
import { User } from '../classes/user';
import { OTP } from '../classes/otp';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = `${environment.apiBaseUrl}/${environment.user}`
  constructor(private http:HttpClient) { }

  getUserById(userId:string){

    return this.http.get(`${this.URL}/${userId}`,{observe:'body'})
  }

  getUserByIdEdit(userId:string){
    return this.http.get(`${this.URL}/edit/${userId}`,{observe:'body'})
  }

  resetPassword(email:string,otp:any){

    let value = new OTP()
    value.otp = otp
    return this.http.post(`${this.URL}/forgot-password/${email}`,value,{
      observe:'body'
    })
  }
  changePassword(email:string,pass:any){
    let user = new User()
    user.password = pass
    return this.http.post(`${this.URL}/change-password/${email}`,user,{
      observe:'body'
    })
  }
  updateUser(user:any,file:File){
    const formData = new FormData()
    formData.append('file', file)
    formData.append('user',JSON.stringify(user))

    return this.http.post(`${this.URL}/edit/file`, formData,{observe:'body'})
  }

  updateUserNFile(user:User){

    return this.http.post(`${this.URL}/edit`, user,{observe:'body'})
  }
}
