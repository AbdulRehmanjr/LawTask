import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client'
import { Message } from '../classes/message';
import { error } from 'jquery';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private SOCKET: string = 'http://localhost:8080/api/v1/ws'

  private messagesSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
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
      this.messageService.add({severity:'info',summary:'Message Received',detail:`Message Recived By ${connectedId}`})
      this.handleNewMessage(newMessage);
    });

    // Store the subscription
    this.subscriptions[connectedId] = subscription;
  }
  private handleNewMessage(newMessage: any) {
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = [...currentMessages, newMessage];
    this.messagesSubject.next(updatedMessages);
  }
  onConnect() {
    this.client.activate()
  }

  sendMessage(data: Message) {
    let message = new Message()
    message = data
    this.client.send('/app/private-message', {}, JSON.stringify(message))
    // if(message.senderName == this.currentUserId && message.receiverName == this.currentReceiverId){
    //   this.messagesSubject.next(updatedMessages);
    // }

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

  public getMessages() {
    return this.messagesSubject;
  }
}
