import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserDashboard } from 'src/app/classes/userdashboard';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserdashboardService } from 'src/app/services/userdashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any
  userDashboard: UserDashboard
  info:any
  time:any
  constructor(private payment: PaymentService,
    private dashboardService: UserdashboardService,

    private message: MessageService) {

  }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user'))
    this.getInfo()
    this.getSubscriptionInfo()
  }
  private dateDiffInDays(dateStr: string): number {

    const date1 = new Date(dateStr);


    const date2 = new Date();


    const oneDay = 1000 * 60 * 60 * 24;


    const diffInMs = Math.abs(date2.getTime() - date1.getTime());


    return Math.round(diffInMs / oneDay);
  }



  getSubscriptionInfo() {
    this.payment.getSubscription(this.user['email']).subscribe({
      next: (response: any) => {
        this.info = response
        this.time = this.dateDiffInDays(this.info.dateValid)
      },
      error: (_error) => {
        this.message.add({
          severity: 'error',
          summary: 'Error!!!',
          detail: 'Cant fetch Dashboard Info'
        })
      },
      complete:()=>{

      }
    })
  }
  getInfo() {
    this.dashboardService.getUserInfo(this.user['userId']).subscribe({
      next: (response: UserDashboard) => {
        this.userDashboard = response
      },
      error: (error) => {
        this.message.add({
          severity: 'error',
          summary: 'Error!!!',
          detail: 'Cant fetch Dashboard Info'
        })
      },
      complete: () => {

      }
    })
  }
  cancel() {
    this.payment.deleteSubscription(JSON.parse(localStorage.getItem('user'))['email']).subscribe({
      next: (_response:any) => {
        this.message.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Subscription Canceled'
        })
      },
      error: (error:any) => {
        this.message.add({
          severity: 'error',
          summary: 'Error!!!',
          detail: 'Subscription not found'
        })
      }
    })
  }

}
