import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/classes/order';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-filessharing',
  templateUrl: './filessharing.component.html',
  styleUrls: ['./filessharing.component.css']
})
export class FilessharingComponent implements OnInit {


  orders: Order[]
  private id: string = ''
  isOrder:boolean = false
  constructor(
    private orderService: OrderService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user'))['userId']
    this.fetchOrder()

  }

  fetchOrder() {

    this.orderService.getOrderByCustomerId(this.id).subscribe({
      next: (response: Order[]) => {
        this.orders = response
this.isOrder = true
      },

      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error in Fetching Orders'
        })
      },
      complete: () => {

      }
    })
  }



}
