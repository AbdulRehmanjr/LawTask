import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class ChatlistService {

  private URL = `${environment.apiBaseUrl}/${environment.chatlist}`
  constructor(private http:HttpClient) { }

  createNewChatList(userId:string){
    return this.http.post(`${this.URL}/${userId}`,{},{
      observe:'body'
    })
  }

  addNewUser(userId:string,receiverId:string){
    return this.http.post(`${this.URL}/${userId}/${receiverId}`,{},{
      observe:'body'
    })
  }
  getChatList(userId:string){
    return this.http.get(`${this.URL}/${userId}`,{observe:'body'})
  }

  getAllMessages(userId:string,receiverId:String){

    return this.http.get(`${this.URL}/${userId}/${receiverId}`,{observe:'body'})
  }

  getMessageCount(userId:string){
    return this.http.get(`${this.URL}/count/${userId}`,{
      observe:'body'
    })
  }
}
