import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/classes/order';
@Component({
  selector: 'app-filessharing',
  templateUrl: './filessharing.component.html',
  styleUrls: ['./filessharing.component.css']
})
export class FilessharingComponent implements OnInit {


  orders:Order[]
  private id:string = ''
  constructor(
    private orderService:OrderService,
    private messageService:MessageService,

  ) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user'))['userId']
   this.fetchOrder()

  }

  fetchOrder(){
    this.orderService.getOrderByUserId(this.id).subscribe({
      next:(response:Order[])=>{
        this.orders = response
      },

      error:(error:any)=>{
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Error in Fetching Orders'
        })
      },
      complete:()=>{

      }
    })
  }
}
