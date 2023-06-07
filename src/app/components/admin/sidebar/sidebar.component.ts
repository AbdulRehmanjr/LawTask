import { Component ,OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import { SellerrequestService } from 'src/app/services/sellerrequest.service';
import { WithdrawService } from 'src/app/services/withdraw.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit{

  count:number = 0
  req:number = 0

  constructor(private withDrawService:WithdrawService,
    private messageService:MessageService,
    private sellerRequest:SellerrequestService){}


  ngOnInit(): void {
    this.fetchCount()
    this.fetchRequestCounts()
  }

  fetchCount(){
    this.withDrawService.getCount().subscribe({
      next: (response: number) => {
          this.count = response
      },
      error: (error: any) => {
        this.messageService.add({
          severity:'error'
        })
      },
      complete: () => console.log()
    })
  }
  fetchRequestCounts(){
    this.sellerRequest.getCount().subscribe({
      next: (response: number) => {
          this.req = response
      },
      error: (error: any) => {
        this.messageService.add({
          severity:'error'
        })
      },
      complete: () => console.log()
    })
  }
}
