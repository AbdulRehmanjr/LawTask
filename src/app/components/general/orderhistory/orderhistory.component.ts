import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Order } from 'src/app/classes/order';
import { FreelancerService } from 'src/app/services/freelancer.service';

import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {


  orders:Order[]
  email:string = ''
  dialog:boolean = false
  rating:number = 1
  selectedOrder:Order
  comment:string = ''
  constructor(
    private orderService:OrderService,
    private messageService:MessageService,
    private freelancerService:FreelancerService
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
        return 'success';
      case false:

        return 'danger';
    }
  }
  getStatus(value: boolean): string {

    switch (value) {
      case true:
        return 'Completed';
      case false:
        return 'Pending';
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
  showDialog(order:Order){

    this.dialog = true
    this.selectedOrder = order
  }
  rateSeller(){

    this.freelancerService.rateFreeLancers(this.selectedOrder.user.userId,this.rating,this.comment,this.selectedOrder.id).subscribe({
      next: (response: any) => {
        this.messageService.add({
          severity:'success',
          summary:"Thanks."
        })
      },
      error: (error: any) => {

      },
      complete: () => {
        this.dialog = false
        this.jobDone(this.selectedOrder)
      }

    })

  }
}
