import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PaymentService } from 'src/app/services/payment.service';
import { SellerService } from 'src/app/services/seller.service';


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

  buySubscription(type:string) {

    const role= JSON.parse(localStorage.getItem('user'))['authority']

    if(role=='SELLER'){
      const email = JSON.parse(localStorage.getItem('user'))['email']
      this.stripeService.paymentConfirm(type,email).subscribe({
        next:(response:any)=>{
          window.location.href = response;
        },
        error:(_err:any)=>{
          console.log(_err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Cant Update to Lower Packages.` })
        },
        complete:()=>{

        }
      })
    }else{
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Must must be an active seller'
      })
    }


  }

  hideDialog() {
    this.displayDialog = false
  }
  showDialog() {
    this.displayDialog = true
  }
}
