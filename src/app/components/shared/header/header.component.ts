import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery'
import { MessageService } from 'primeng/api';
import { Notification } from 'src/app/classes/notification';
import { User } from 'src/app/classes/user';
import { ChatlistService } from 'src/app/services/chatlist.service';
import { NotificationService } from 'src/app/services/notification.service';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit {


  check: string
  role: string = ''
  isAdmin: boolean = false
  profile: string = ''
  private user: any
  userResponse: User
  sidebarVisible: boolean = false
  count: number = 0
  notCount: number = 0
  notifications: Notification[]
  constructor(private router: Router, private userService: UserService,
    private messageService: MessageService,
    private chatListService: ChatlistService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user'))
    this.check = this.user['userId']
    this.userCheck()
    this.fetchUser()
    this.fetchMessagesCount()
    this.fetchNotifcations()
  }
  ngAfterViewInit(): void {
    this.profileDropdown()
  }
  showSideBar() {
    this.sidebarVisible = true
  }

  fetchUser() {
    this.userService.getUserById(this.check).subscribe({
      next: (response: User) => {
        this.userResponse = response
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
        })
      },
      error: (_error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User fetching error'
        })
      },
      complete: () => {
      }
    })
  }

  GoToDashboard() {
    if(this.role=='ADMIN'){
      this.router.navigate(['/admin-dashboard'])
    }
    else{
      this.router.navigate(['/seller-dashboard'])
    }
  }

  GoToProfile() {
    if(this.role=='SELLER'){
      this.router.navigateByUrl(`/home/profile/${this.user['userId']}`)
    }

  }


  userCheck(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    this.role = user.authority
    if (this.role === 'ADMIN') {
      this.isAdmin = true
    }
  }

  fetchMessagesCount() {
    this.chatListService.getMessageCount(this.check).subscribe({
      next: (response: number) => {
        this.count = response
      },
      error: (error: any) => {

      },
      complete: () => {

      }
    })
  }
  fetchNotifcations() {
    this.notificationService.getAllNotifications(this.check).subscribe({
      next: (response: Notification[]) => {
        this.notifications = response
      },
      error: (error: any) => {

      },
      complete: () => {
        this.notifications = this.notifications.sort((a, b) => b.id - a.id)
        this.notCount = this.notifications.length
      }
    })
  }
  logOut() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setInterval(
      () => {
        location.reload()
      }, 1000
    )
    this.router.navigate(['/home/'])
  }
  profileDropdown(): void {

    $(".header-notifications").each(function () {
      var userMenu = $(this);
      var userMenuTrigger = $(this).find('.header-notifications-trigger a');
      console.log('found')
      $(userMenuTrigger).on('click', function (event) {
        event.preventDefault();
        console.log('clicked')
        if ($(this).closest(".header-notifications").is(".active")) {
          close_user_dropdown();
        } else {
          close_user_dropdown();
          userMenu.addClass('active');
        }
      });
    });

    // Closing function
    function close_user_dropdown() {
      $('.header-notifications').removeClass("active");
    }

    // Closes notification dropdown on click outside the conatainer
    var mouse_is_inside = false;

    $(".header-notifications").on("mouseenter", function () {
      mouse_is_inside = true;
    });
    $(".header-notifications").on("mouseleave", function () {
      mouse_is_inside = false;
    });

    $("body").mouseup(function () {
      if (!mouse_is_inside) close_user_dropdown();
    });

    // Close with ESC
    $(document).keyup(function (e) {
      if (e.keyCode == 27) {
        close_user_dropdown();
      }
    });

  }
}
