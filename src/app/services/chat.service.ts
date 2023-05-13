import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client'
import { Message } from '../classes/message';
import { error } from 'jquery';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private SOCKET: string = 'http://localhost:8080/api/v1/ws'

  private messages: any[] = []
  private sockJS = new SockJS(this.SOCKET);
  private client:CompatClient  = Stomp.over(this.sockJS)
  private sender:string = ''
  private subscriptions: { [key: string]: any } = {};
  constructor() {
    this.sender = JSON.parse(localStorage.getItem('user'))['userId']
    this.client.onStompError = (frame) => {
      console.error('WebSocket Error:', frame);
    };
    this.client.onConnect = (frame) => {
      console.log('Connected to WebSocket server',frame);

    };
  }

  connectToUser(receiverId:string){

    if (this.subscriptions[receiverId]) {
      console.log(`Already subscribed to user ${receiverId}`);
      return;
    }

    // Establish a new subscription
    const subscription = this.client.subscribe(`/userChat/${receiverId}/private`, (message) => {
      const newMessage: Message = JSON.parse(message.body);
      if (newMessage.senderName === receiverId) {
        this.messages.push(newMessage);
      }
    });

    // Store the subscription
    this.subscriptions[receiverId] = subscription;
  }
  onConnect() {
    this.client.activate()
  }
  sendMessage(data: Message) {
    let message = new Message()
    message = data
    message.senderName = JSON.parse(localStorage.getItem('user'))['userId']
    this.client.send('/app/private-message', {}, JSON.stringify(message))
    this.messages.push(message)
  }
  disconect(receiverId:string){
    if (this.subscriptions[receiverId]) {
      // Unsubscribe and remove the subscription
      this.subscriptions[receiverId].unsubscribe();
      delete this.subscriptions[receiverId];
    }
  }
  onDisconnect(){

    this.client.disconnect()
  }
  getMessages(): Message[] {
    return this.messages;
  }
}
