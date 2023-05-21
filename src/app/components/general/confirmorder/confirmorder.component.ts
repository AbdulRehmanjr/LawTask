import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Job } from 'src/app/classes/job';
import { Order } from 'src/app/classes/order';
import { User } from 'src/app/classes/user';
import { JobsService } from 'src/app/services/jobs.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-confirmorder',
  templateUrl: './confirmorder.component.html',
  styleUrls: ['./confirmorder.component.css']
})
export class ConfirmorderComponent {

  private orderId :string = ''

  confirmOrder:Order
  file:File

  order:FormGroup

  constructor(private route:ActivatedRoute,
    private form:FormBuilder,
    private payment:PaymentService,
    private orderService:OrderService,
    private messageService:MessageService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
    });

    this.fetchOrder()

  }

  fetchOrder(){
    this.orderService.getOrderById(this.orderId).subscribe({
      next:(response:Order)=>{
        this.confirmOrder = response
      },
      error:(_error)=>{
        console.log(_error)
      },
      complete:()=>{
        this.createForm()
      }
    })
  }
  createForm(){
      this.order = this.form.group({
        userName: new FormControl('Filled by User',Validators.required),
        orderId : new FormControl('',Validators.required),
        startDate: new FormControl(this.confirmOrder?.startedDate,Validators.required),
        endDate : new FormControl(this.confirmOrder?.endedDate,Validators.required),
        email: new FormControl('Filled BY User',Validators.required),
        description: new FormControl(this.confirmOrder?.description,Validators.required),
        requirement: new FormControl('',Validators.required),
        price :new FormControl(this.confirmOrder?.price,Validators.required)
      })
  }
  onChange(event: any) {
    this.file = event.target.files[0]
  }
  onSubmit(){

    let makeOrder = new Order()
    let job = new Job()
    let user = new User()

    makeOrder.customerName = this.order.get('userName').value
    makeOrder.customerEmail = this.order.get('email').value
    makeOrder.startedDate = this.order.get('startDate').value
    makeOrder.endedDate = this.order.get('endDate').value
    makeOrder.description = this.order.get('description').value
    job.jobId =  this.order.get('orderId').value
    makeOrder.job = job
    makeOrder.user = user

    const customer = new User()

    customer.userId = JSON.parse(localStorage.getItem('user'))['userId']
    makeOrder.customer = customer

    console.log(makeOrder)
    this.orderService.confirmOrderByUser(makeOrder,this.file).subscribe({
      next:(_response:any)=>{
        this.messageService.add({severity:'success',summary:'Add Success',detail:'Order confirmed'})

      },
      error:(_error:any)=>{

        this.messageService.add({severity:'error',summary:'Error',detail:'Error Making Order'})
      },
      complete:()=>{
        this.payment.paymentIntent(makeOrder).subscribe({
          next:(response:any)=>{

            window.location.href = response;
          },
          error:(_err:any)=>{
            console.log(_err)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Something went Wrong. Please check you internet connection or provided information` })
          },
          complete:()=>{

          }
        })
      }
    })
  }
}
