import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/classes/message';
import { Seller } from 'src/app/classes/seller';
import { SellerService } from 'src/app/services/seller.service';
import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = ''
  sellerId: string |null
  seller: Seller
  date: any
  time: any

  constructor(private sellerService: SellerService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {

    this.sellerId = this.route.snapshot.paramMap.get('sellerId')
    this.fetchSeller()
    const time = new Date()
    console.log(this.time = time.toLocaleTimeString())
    const currentDate = new Date();
    const options: any = { month: 'long', day: 'numeric', year: 'numeric' };
    this.date = currentDate.toLocaleDateString('en-US', options)

    this.connection()

  }
  connection() {

    const sockJS = new SockJS('http://localhost:8080/api/v1/ws');
    const stompClient = Stomp.over(sockJS);

    stompClient.connect({}, (frame) => {
      console.log('Connected:', frame);
      // Perform actions upon successful connection
    }, (error) => {
      console.error('Connection error:', error);
      // Handle connection error
    });


  }

  sendMessage(data: any) {

    const message = new Message()
    message.id=1
    message.message = data.value
    message.type='SENDER'


    this.messages.push(message)
    data.value = ''
   this.getMessage(message)
console.log(this.messages)

  }

  fetchSeller(): void {
    this.sellerService.getSeller(this.sellerId).subscribe({
      next: (response: Seller) => {
        this.seller = response
      },
      error: (error: any) => {
        console.log('error')
      },
      complete: () => {
        console.log('seller fetched in communication')
      }
    })
  }
  send(): void {

  }

  getMessage(data:Message):void{
    let message = new Message()
    message.id = 2
    message.message = data.message
    message.type='RECEIVER'
    this.messages.push(message)
  }



  // sendMessage() {
  //   this.socketService.sendMessage(this.message);
  //   this.message = '';
  // }
}
