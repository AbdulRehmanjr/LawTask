import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/classes/user';
import { UserDashboard } from 'src/app/classes/userdashboard';
import { WithDraw } from 'src/app/classes/withdraw';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserdashboardService } from 'src/app/services/userdashboard.service';
import { WithdrawService } from 'src/app/services/withdraw.service';

@Component({
  selector: 'app-withdrawrequest',
  templateUrl: './withdrawrequest.component.html',
  styleUrls: ['./withdrawrequest.component.css']
})
export class WithdrawrequestComponent implements OnInit {

  userInfo: UserDashboard
  userId: string = ''
  amount: number = 50
  reason: string = ''
  withDraws: WithDraw[]
  status: string = ''

  constructor(
    private dashboardService: UserdashboardService,
    private messageService: MessageService,
    private withDrawService: WithdrawService
  ) { }
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user'))['userId']
    this.getInfo()
    this.fetchWithDrawHistory()
  }
  getInfo() {
    this.dashboardService.getUserInfo(this.userId).subscribe({
      next: (response: UserDashboard) => {
        this.userInfo = response
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error!!!',
        })
      },
      complete: () => {

      }
    })
  }
  fetchWithDrawHistory() {
    this.withDrawService.getWithDrawHistory(this.userId).subscribe({
      next: (response: WithDraw[]) => {
        this.withDraws = response
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error!!!',
        })
      },
      complete: () => {

      }
    })
  }
  forwardRequest(amount: number, reason: string) {

    let withDraw = new WithDraw()
    let user = new User()
    withDraw.amount = amount
    withDraw.reason = reason
    user.userId = this.userId
    withDraw.user = user

    this.withDrawService.saveWithDraw(withDraw).subscribe({
      next: (response: WithDraw) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success'
        })

      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error'
        })
      },
      complete: () => {
        this.amount = 50
        this.reason = ''
        this.fetchWithDrawHistory()
      }
    })
  }
  getSeverity(status: boolean): string {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }
  getStatus(value: boolean): string {

    switch (value) {
      case true:
        return 'Accepted';
      case false:
        return 'Pending';
    }
  }

}
