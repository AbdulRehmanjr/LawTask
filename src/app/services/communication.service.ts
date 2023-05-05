import { Injectable } from '@angular/core';

import {  Stomp } from '@stomp/stompjs'
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private SOCKET:string = 'http://localhost:8080/app'
  private client: any
  private messages: any[] = []

  constructor() {

    const sockJS = new SockJS(this.SOCKET);


    this.client = Stomp.over(sockJS);
  }

  connect() {
    // connect to the STOMP server
    this.client.connect({}, () => {
      console.log('Connected to WebSocket server');

      // subscribe to a message queue
      this.client.subscribe('/topic/message', (message) => {
        const newMessage: any = JSON.parse(message.body);
        this.messages.push(newMessage);
      });
    });
  }
  sendMessage(message: any) {
    // send a message to the server
    this.client.send('/app/send-message', {}, JSON.stringify(message));
  }

  getMessages(): any[] {
    return this.messages;
  }
}
