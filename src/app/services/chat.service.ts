import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userId:string =''
  socket:any
  constructor() {


  }

  public joinRoom(userId:string): void {
    console.log(`join room using ${userId}`)
    try {
      this.socket.emit('joinRoom', userId);
    } catch (error) {
      console.error(error)
    }

  }

  public leaveRoom(): void {
    this.socket.emit('leaveRoom', this.userId);
  }

  public sendMessage(message: string): void {
    this.socket.emit('chatMessage', { userId: this.userId, message: message });
  }

  // public receiveMessages(): Observable<any> {
  //   return this.socket.fromEvent('chatMessage');
  // }

  // public receiveUserJoined(): Observable<any> {
  //   return this.socket.fromEvent('userJoined');
  // }

  // public receiveUserLeft(): Observable<any> {
  //   return this.socket.fromEvent('userLeft');
  // }
}
