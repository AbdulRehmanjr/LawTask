import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/classes/message';
import { Seller } from 'src/app/classes/seller';
import { CommunicationService } from 'src/app/services/communication.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = ''
  sellerId: string
  seller: Seller
  date: any
  time: any

  constructor(private sellerService: SellerService,
    private route: ActivatedRoute,
    private chat:CommunicationService
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

    this.chat.connect()
  }

  sendMessage(data: any) {

    const message = new Message()
    message.message = data.value
    message.type='SENDER'


    this.messages.push(message)
    data.value = ''
    this.chat.sendMessage(message)
    // console.log(message)
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




  // sendMessage() {
  //   this.socketService.sendMessage(this.message);
  //   this.message = '';
  // }
}
