import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/classes/order';
import { OrderService } from 'src/app/services/order.service';

import * as fileSave from 'file-saver'
@Component({
  selector: 'app-pendingorders',
  templateUrl: './pendingorders.component.html',
  styleUrls: ['./pendingorders.component.css']
})
export class PendingordersComponent implements OnInit {


  orders:Order[]
  status:string = ''
  private id:string = ''
  constructor(
    private orderService:OrderService,
    private messageService:MessageService
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
        console.error(error)
      },
      complete:()=>{

      }
    })
  }

  download(order:Order){

    const byteCharacters = atob(order.requirementFile);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: `${order.documentType}` })
    fileSave.saveAs(file, `${order.customerName}.${order.documentType.split('/')[1]}`)
  }

  getSeverity(value: boolean): string {
    switch (value) {
      case true:
        // this.status = 'Completed'
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
}
