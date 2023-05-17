import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client'
import { Message } from '../classes/message';
import { error } from 'jquery';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private SOCKET: string = 'http://localhost:8080/api/v1/ws'

  private messages: any[] = []
  private sockJS = new SockJS(this.SOCKET);
  private client: CompatClient = Stomp.over(this.sockJS)
  private currentUserId: string = ''
  private currentReceiverId:string = ''
  private subscriptions: { [key: string]: any } = {};
  constructor(private messageService:MessageService) {
    this.currentUserId = JSON.parse(localStorage.getItem('user'))['userId']
    this.client.onStompError = (frame) => {
      console.error('WebSocket Error:', frame);
    };
    this.client.onConnect = (frame) => {
      console.log('Connected to WebSocket server', frame);

    };
  }

  connectToUser(connectedId: string) {

    if (this.subscriptions[connectedId]) {
      console.log(`Already subscribed to user ${connectedId}`);
      return;
    }
   // this.unsubscribeFromPreviousUser();


    // Establish a new subscription
    const subscription = this.client.subscribe(`/userChat/${connectedId}/private`, (message:any) => {
      const newMessage: Message = JSON.parse(message.body);

      if (newMessage.receiverName === this.currentUserId || newMessage.senderName === connectedId) {
        this.messageService.add({
          severity: 'info',
          summary: 'Received Message',
          detail: `Received message from ${newMessage.senderName}`
        });
        this.messages.push(newMessage);
      }
    });

    // Store the subscription
    this.subscriptions[connectedId] = subscription;
  }
  onConnect() {
    this.client.activate()
  }
  private unsubscribeFromPreviousUser() {
    for (const userId in this.subscriptions) {
      if (this.subscriptions.hasOwnProperty(userId)) {
        this.subscriptions[userId].unsubscribe();
        delete this.subscriptions[userId];
      }
    }
  }

  sendMessage(data: Message) {
    let message = new Message()
    message = data
    this.client.send('/app/private-message', {}, JSON.stringify(message))
    if(message.senderName == this.currentUserId && message.receiverName == this.currentReceiverId){
      this.messages.push(message)
    }

  }
  disconect(receiverId: string) {
    if (this.subscriptions[receiverId]) {
      // Unsubscribe and remove the subscription
      this.subscriptions[receiverId].unsubscribe();
      delete this.subscriptions[receiverId];
    }
  }
  onDisconnect() {

    this.client.disconnect()
  }
  getMessages(): Message[] {
    return this.messages;
  }
}
