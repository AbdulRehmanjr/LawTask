import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatlistService {

  private URL = 'http://localhost:8080/api/v1/chatlist'
  constructor(private http:HttpClient) { }

  createNewChatList(userId:string){
    return this.http.post(`${this.URL}/${userId}`,{})
  }

}
