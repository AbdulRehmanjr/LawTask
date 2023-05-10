import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/classes/message';
import { Seller } from 'src/app/classes/seller';
import { User } from 'src/app/classes/user';
import { ChatService } from 'src/app/services/chat.service';
import { ChatlistService } from 'src/app/services/chatlist.service';
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
  users:User[]
  selectedUser:User
  sender:User
  seller: Seller
  date: any
  time: any
  oldMessages:Message[]
  isClicked: boolean = false;
  isSeller: boolean

  constructor(private sellerService: SellerService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private chatListService:ChatlistService,
    private userService:UserService
  ) {

  }

  ngOnInit(): void {
    this.senderId = JSON.parse(localStorage.getItem('user'))['userId']
    // this.sellerId = this.route.snapshot.paramMap.get('sellerId')
    // this.fetchSeller()

    // const currentDate = new Date();
    // const options: any = { month: 'long', day: 'numeric', year: 'numeric' };
    // this.date = currentDate.toLocaleDateString('en-US', options)

    this.fetchUser()
    this.fetchChatList()

    this.chatService.connect()
    this.messages = this.chatService.getMessages()
  }

  fetchChatList(){
    this.chatListService.getChatList(this.senderId).subscribe({
      next:(response:User[])=>{
        console.log('response of userList')
        this.users = response
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      },
      complete:()=>{
        console.log('completed usre list')
      }
    })
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
    console.log('sending')
    const message = new Message()

    this.time = new Date().toLocaleTimeString()

    message.content = data.value
    message.senderName = this.senderId
    message.receiverName = this.selectedUser?.userId
    message.date = this.time
    message.type = 'SENDER'

    data.value = ''

    this.chatService.sendMessage(message)
  }

  fetchMessage(){
      this.chatListService.getAllMessages(this.senderId,this.selectedUser.userId).subscribe({

        next:(response:Message[])=>{
        this.oldMessages = response

        },
        error:(error:any)=>{
          console.log(error)
        },
        complete:()=>{
          this.oldMessages.forEach(
            message=>{
              if(message.receiverName==this.senderId){
                message.type='RECEIVER'
              }
            }
          )
        }
      })
  }
  /**
   * @deprecated deprected and will be removed in future
   */
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
  selectUser(user:User) {
    this.isClicked = !this.isClicked;
    this.selectedUser = user
    this.fetchMessage()
  }

}
