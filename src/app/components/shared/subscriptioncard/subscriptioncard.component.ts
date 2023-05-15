import { Component, Input, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardSubscription } from 'src/app/classes/subscription';
import { PaymentService } from 'src/app/services/payment.service';
import { SellerService } from 'src/app/services/seller.service';
import { environment } from 'src/app/variables/environment ';
import { StripeScriptTag } from 'stripe-angular';

@Component({
  selector: 'shared-subscriptioncard',
  templateUrl: './subscriptioncard.component.html',
  styleUrls: ['./subscriptioncard.component.css']
})
export class SubscriptioncardComponent implements OnInit {



  @Input()
  actionForm: boolean
  displayDialog: boolean = false

  constructor(private sellerService: SellerService,private stripeService:PaymentService,
    private messageService:MessageService) {
  }
  ngOnInit(): void {

  }
  subscription(type: string) {
    // const userId = JSON.parse(localStorage.getItem('user'))['userId']

    // let subs = new CardSubscription
    // subs.userId = userId
    // subs.subscription = type

    // this.sellerService.updateSubscription(subs).subscribe({
    //   next:(response:any)=>{
    //     console.log(response)
    //   },
    //   error:(error:any)=>{
    //     console.error(error)
    //   },
    //   complete:()=>{
    //     console.log('card Subscription added')

    //   }
    // })


  }

  buySubscription(type:string) {
    const email = JSON.parse(localStorage.getItem('user'))['email']
    this.stripeService.paymentConfirm(type,email).subscribe({
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

  hideDialog() {
    this.displayDialog = false
  }
  showDialog() {
    this.displayDialog = true
  }
}
