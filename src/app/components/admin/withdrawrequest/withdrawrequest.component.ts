import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { WithDraw } from 'src/app/classes/withdraw';
import { WithdrawService } from 'src/app/services/withdraw.service';

@Component({
  selector: 'app-withdrawrequest',
  templateUrl: './withdrawrequest.component.html',
  styleUrls: ['./withdrawrequest.component.css']
})
export class WithdrawrequestComponent implements OnInit {

  withdraws: WithDraw[]
  constructor(private messageService: MessageService,
    private withDrawService: WithdrawService) { }


  ngOnInit(): void {
    this.fetchAllWithDraws()
  }

  giveMoney(withdraw: WithDraw) {
    this.withDrawService.updateWithDraw(withdraw).subscribe({
      next: (response: any) =>{

      },
      error: (error: any) => {
        this.messageService.add({
          severity:'error',
          summary:'Error'
        })
      },
      complete: () => {
        this.fetchAllWithDraws()
      }
    })
  }

  fetchAllWithDraws(){
    this.withDrawService.getAllWithDraw().subscribe({
      next: (response: WithDraw[]) => {
        this.withdraws = response
      },
      error: (error: any) => {
        this.messageService.add({
          severity:'error',
          summary:'Error'
        })
      },
      complete: () => console.log()
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
