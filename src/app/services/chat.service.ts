import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client'
import { Message } from '../classes/message';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
private SOCKET:string = 'http://localhost:8080/api/v1/ws'
  private client: any
  private messages: any[] = []

  constructor() {

    const sockJS = new SockJS(this.SOCKET);


    this.client = Stomp.over(sockJS);
  }

  connect() {

    this.client.connect({}, () => {
      console.log('Connected to WebSocket server');


      this.client.subscribe('/chatroom/public', (message) => {
        const newMessage: Message = JSON.parse(message.body)

        if(newMessage.senderName!=JSON.parse(localStorage.getItem('user'))['userId']){
          this.messages.push(newMessage)
        }


      });
    });
  }
  sendMessage(data: Message) {
    let message = new Message()
    message = data
    message.senderName = JSON.parse(localStorage.getItem('user'))['userId']
    this.client.send('/app/message', {}, JSON.stringify(message));
    this.messages.push(message)
  }


  getMessages(): any[] {
    return this.messages;
  }
}
