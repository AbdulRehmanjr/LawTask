import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'src/app/classes/message';
import { Seller } from 'src/app/classes/seller';
import { User } from 'src/app/classes/user';
import { ChatService } from 'src/app/services/chat.service';
import { ChatlistService } from 'src/app/services/chatlist.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit,AfterViewChecked{
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
  @ViewChild('chatContainer', { static: false }) chatContainer: ElementRef;
  sidebarVisible: boolean

  constructor(
    private chatService: ChatService,
    private chatListService:ChatlistService,
    private userService:UserService,
    private messageService:MessageService
  ) {

  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.senderId = JSON.parse(localStorage.getItem('user'))['userId']
    this.fetchUser()
    this.fetchChatList()

    this.chatService.onConnect()
    this.messages = this.chatService.getMessages()
  }

  fetchChatList(){
    this.chatListService.getChatList(this.senderId).subscribe({
      next:(response:User[])=>{
        this.users = response
      },
      error:(error:any)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in fetching list' })
      },
      complete:()=>{
      }
    })
  }
  fetchUser(){
    this.userService.getUserById(this.senderId).subscribe({
      next :(response:User)=>{

        this.sender = response

      },
      error:(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in fecthing user' })
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
    // this.chatService.connect()
    this.chatService.sendMessage(message)
  }
  scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
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

  selectUser(user:User) {
    this.isClicked = !this.isClicked;
    this.selectedUser = user
    this.chatService.connectToUser(this.selectedUser?.userId)
    this.fetchMessage()
  }

}
