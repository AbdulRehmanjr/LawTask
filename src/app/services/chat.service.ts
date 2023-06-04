import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client'
import { Message } from '../classes/message';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../variables/environment ';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private SOCKET: string = `${environment.apiBaseUrl}/${environment.socket}`

  private messagesSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private sockJS = new SockJS(this.SOCKET);
  private client: CompatClient = Stomp.over(this.sockJS)
  private currentUserId: string = ''
  private currentReceiverId: string = ''
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private reconnectInterval: number = 5000;
  private reconnectTimer: any;
  private subscriptions: { [key: string]: any } = {};

  constructor(private messageService: MessageService,
    private http:HttpClient) {
    this.currentUserId = JSON.parse(localStorage.getItem('user'))['userId']
    this.initWebSocket();
  }

  private initWebSocket() {
    this.client.onStompError = (frame) => {
      this.isConnected.next(false)
    };
    this.client.onConnect = (frame) => {
      this.isConnected.next(true)
    };
    this.client.onWebSocketClose = (frame)=>{
      this.isConnected.next(false)
    }
  }

  connectToUser(connectedId: string) {

    if (this.subscriptions[connectedId]) {

      return;
    }
    const subscription = this.client.subscribe(`/userChat/${connectedId}/private`, (message: any) => {
      const newMessage: Message = JSON.parse(message.body);
      this.messageService.add({ severity: 'info', summary: 'Message Received', detail: `Message Received` })
      this.handleNewMessage(newMessage);
      this.readOneMessage(newMessage).subscribe({
        next:(response:boolean)=>{

        },
        error:(errro:any)=>{

        },
        complete:()=>{

        }
      })
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
    try {
      this.client.send('/app/private-message', {}, JSON.stringify(message))
    } catch (error) {
      this.isConnected.next(false)
    }

  }
  readOneMessage(message:Message){
    const url = `${environment.apiBaseUrl}/${environment.chatlist}`
   return this.http.post(`${url}/read-message`,message,{
      observe:'body'
    })

  }
  readAllMessages(from:string,to:string){
    const url = `${environment.apiBaseUrl}/${environment.chatlist}`
   return this.http.post(`${url}/read-messages/${from}/${to}`,{},{
      observe:'body'
    })

  }
  disconect(receiverId: string) {
    if (this.subscriptions[receiverId]) {
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

  getConnectionStatus(){
    return this.isConnected.asObservable()
  }
}
