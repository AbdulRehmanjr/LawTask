import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/classes/order';
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

  constructor(private route:ActivatedRoute,
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

      },
      complete:()=>{
        this.confirmOrder.customerName = ''
        this.confirmOrder.customerEmail = ''
        console.log(this.confirmOrder)
      }
    })
  }
  onChange(event: any) {
    this.file = event.target.files[0]
  }
  onSubmit(form:any){


    let customer = JSON.parse(localStorage.getItem('user'))['userId']

    this.confirmOrder.customerId = customer
    this.confirmOrder.job.user = null
    this.confirmOrder.user.role = null

    this.orderService.confirmOrderByUser(this.confirmOrder,this.file).subscribe({
      next:(_response:any)=>{
        this.messageService.add({severity:'success',summary:'Add Success',detail:'Order confirmed'})

      },
      error:(_error:any)=>{
        console.error(_error)
        this.messageService.add({severity:'info',summary:'Information',detail:`${_error.error}`})
      },
      complete:()=>{
        this.payment.paymentIntent(this.confirmOrder).subscribe({
          next:(response:any)=>{
            window.location.href = response;
          },
          error:(_err:any)=>{

            this.messageService.add({ severity: 'info', summary: 'Error', detail: `Something went Wrong. Please check you internet connection or provided information` })
          },
          complete:()=>{

          }
        })
      }
    })
  }
}
