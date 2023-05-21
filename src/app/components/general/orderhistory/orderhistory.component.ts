import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Job } from 'src/app/classes/job';
import { Order } from 'src/app/classes/order';
import { Seller } from 'src/app/classes/seller';
import { JobsService } from 'src/app/services/jobs.service';
import { OrderService } from 'src/app/services/order.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {


  orders:Order[]
  email:string = ''
  constructor(
    private orderService:OrderService,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('user'))['email']
    this.fetchOrder()

  }

  fetchOrder(){

  }


}
