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
export class CommunicationComponent implements OnInit, AfterViewChecked {

  messages: Message[] = [];
  currentUserId: string
  users: User[]
  selectedUser: User
  sender: User
  time: any
  isUsers: boolean = false
  oldMessages: Message[]
  isClicked: boolean = false

  @ViewChild('chatContainer', { static: false }) chatContainer: ElementRef;
  sidebarVisible: boolean

  constructor(
    private chatService: ChatService,
    private chatListService: ChatlistService,
    private userService: UserService,
    private messageService: MessageService
  ) {

  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.currentUserId = JSON.parse(localStorage.getItem('user'))['userId']
    this.fetchUser()
    this.fetchChatList()

    this.chatService.onConnect()
    this.messages = this.chatService.getMessages()


  }

  fetchChatList() {
    this.chatListService.getChatList(this.currentUserId).subscribe({
      next: (response: User[]) => {
        this.users = response
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in fetching list' })
      },
      complete: () => {
        this.isUsers = true;
      }
    })
  }
  fetchUser() {
    this.userService.getUserById(this.currentUserId).subscribe({
      next: (response: User) => {

        this.sender = response

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in fecthing user' })
      },
      complete: () => {
        console.log('completed')
      }
    })
  }
  /**
   * @deprecated
   * @param $event
   */
  onFileSelected($event: any) {
    const file = $event.target.files[0]
    const reader = new FileReader();
    reader.onload = (event: any) => {

    };
    //reader.readAsArrayBuffer(file);
    reader.readAsDataURL(file);
    console.log(file)
  }

  sendMessage($event: Event, data: any) {

    $event.preventDefault()

    if (data.value == '') {
      return
    }
    const message = new Message();
    message.content = data.value;
    message.senderName = this.currentUserId;
    message.receiverName = this.selectedUser?.userId;
    message.date = this.time;
    message.type = 'SENDER';

    data.value = '';

    // Only push the sent message if the current user is the sender or recipient
    if (message.senderName === this.currentUserId || message.receiverName === this.currentUserId) {
      this.messages.push(message);
      this.chatService.sendMessage(message)
    }
  }

  scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  fetchMessage() {
    this.chatListService.getAllMessages(this.currentUserId, this.selectedUser.userId).subscribe({

      next: (response: Message[]) => {
        this.oldMessages = response

      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        this.oldMessages.forEach(
          message => {
            if (message.receiverName == this.currentUserId) {
              message.type = 'RECEIVER'
            }
          }
        )
      }
    })
  }

  selectUser(user: User) {
    this.isClicked = !this.isClicked;
    this.selectedUser = user
    this.messages = [];
    this.chatService.connectToUser(this.selectedUser?.userId)
    this.fetchMessage()
  }

}
