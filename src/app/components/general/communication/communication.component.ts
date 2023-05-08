import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/classes/message';
import { Seller } from 'src/app/classes/seller';
import { User } from 'src/app/classes/user';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
import { SellerService } from 'src/app/services/seller.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = ''
  sellerId: string | null
  senderId:string
  sender:User
  seller: Seller
  date: any
  time: any
  isClicked: boolean = false;
  isSeller: boolean

  constructor(private sellerService: SellerService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService:UserService
  ) {

  }

  ngOnInit(): void {
    this.senderId = JSON.parse(localStorage.getItem('user'))['userId']
    this.sellerId = this.route.snapshot.paramMap.get('sellerId')
    this.fetchSeller()
    const time = new Date()
    console.log(this.time = time.toLocaleTimeString())
    const currentDate = new Date();
    const options: any = { month: 'long', day: 'numeric', year: 'numeric' };
    this.date = currentDate.toLocaleDateString('en-US', options)

    this.fetchUser()
    this.chatService.connect()
    this.messages = this.chatService.getMessages()
  }

  fetchUser(){
    this.userService.getUserById(this.senderId).subscribe({
      next :(response:User)=>{

        this.sender = response

      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{
        console.log('completed')
      }
    })
  }

  sendMessage($event:Event,data: any) {

    $event.preventDefault()

    if(data.value==''){
      return
    }
    const message = new Message()

    message.content = data.value
    message.type = 'SENDER'

    data.value = ''

    this.chatService.sendMessage(message)
  }

  fetchSeller(): void {
    this.sellerService.getSeller(this.sellerId).subscribe({
      next: (response: Seller) => {
        this.seller = response
        this.isSeller = true
      },
      error: (error: any) => {
        console.log('error')
      },
      complete: () => {
        console.log('seller fetched in communication')
      }
    })
  }
  changeBackground() {
    this.isClicked = !this.isClicked;
  }

}
