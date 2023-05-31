import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Order } from 'src/app/classes/order';

import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {


  orders:Order[]
  email:string = ''
  status:string = ''
  constructor(
    private orderService:OrderService,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('user'))['userId']
    this.fetchOrder()

  }

  fetchOrder(){
    this.orderService.getOrderByCustomerId(this.email).subscribe({
      next:(response:Order[])=>{
        this.orders = response
        this.messageService.add({
          severity:'success',
          summary:'Fetched',
          detail:'Order fetched'
        })
      },

      error:(error:any)=>{
        this.messageService.add({
          severity:'error',
          summary:'Fetching Error',
          detail:'Order fetching error'
        })
      },
      complete:()=>{

      }
    })
  }

  getSeverity(status: boolean): string {
    switch (status) {
      case true:
        this.status = 'Completed'
        return 'success';
      case false:
        this.status = 'Pending'
        return 'danger';
    }
  }

  jobDone(order:Order){
    this.orderService.orderDone(order).subscribe({
      next:(response:Order)=>{
        this.messageService.add({
          severity:'success',
          summary:'Status Updated',
          detail:'Done'
        })
      },
      error:(error)=>{
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Something went wrong'
        })
      },
      complete:()=>{
        this.fetchOrder()
      }
    })
  }
}
