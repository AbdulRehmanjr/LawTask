import { Component, Input, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { CardSubscription } from 'src/app/classes/subscription';
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
  displayDialog:boolean = false

  constructor(private sellerService: SellerService) {
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



  hideDialog() {
    this.displayDialog = false
  }
  showDialog() {
    this.displayDialog = true
  }
}
