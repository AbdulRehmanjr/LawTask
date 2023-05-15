import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/variables/environment ';
import { StripeScriptTag } from 'stripe-angular';
import { Stripe, StripeCardElement, StripeCardElementOptions, StripeElement, StripeElements, StripePaymentElement, loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'shared-stripecard',
  templateUrl: './stripecard.component.html',
  styleUrls: ['./stripecard.component.css'],
})
export class StripecardComponent implements OnInit, AfterViewInit, OnDestroy {


  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {

  }
  onCheckout() {
    this.http.post('http://localhost:8080/api/v1/checkout/create-checkout-session', {},{observe:'body',responseType:'text'}).subscribe(
      {
        next: (response:any) => {
          window.location.href = response;
        },
        error:

          (error) => {
            console.error('There was an error!', error);

          }
      }
    );
  }

}

