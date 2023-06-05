import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserDashboard } from 'src/app/classes/userdashboard';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserdashboardService } from 'src/app/services/userdashboard.service';

@Component({
  selector: 'app-withdrawrequest',
  templateUrl: './withdrawrequest.component.html',
  styleUrls: ['./withdrawrequest.component.css']
})
export class WithdrawrequestComponent implements OnInit {

  userInfo:UserDashboard
  userId:string = ''
  amount:number = 0
  reason:string = ''

  constructor(
    private dashboardService:UserdashboardService,
    private messageService:MessageService
  ){}
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user'))['userId']
    this.getInfo()
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
          detail: 'Cant fetch  Info'
        })
      },
      complete: () => {

      }
    })
  }
  forwardRequest(amount: number,reason: string) {

    }

}
