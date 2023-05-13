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
  cardDetailsFilledOut = false
  invalidError: any
  cardCaptureReady = 0
  extraData: any = {}
  stripe: Stripe
  cardElement: StripeCardElement
  card: StripeCardElement
  stripePromise: any
  cardForm: FormGroup
  private client_secert: string = ''
  @ViewChild('cardElement') cardElementRef: ElementRef

  constructor(
    private stripeScriptTag: StripeScriptTag,
    private http: HttpClient,
    private paymentService: PaymentService
  ) {

  }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    loadStripe(environment.stripePublicKey).then(stripe => {
      this.stripe = stripe;
      const elements = stripe.elements();
      if (!this.card) {
        this.card = elements?.create('card', {
          style: {
            base: {
              color: '#32325d',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '18px',
              '::placeholder': {
                color: '#aab7c4'
              }
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a'
            }
          }
        });
        this.card.mount(this.cardElementRef.nativeElement);
      }
    })

  }
  ngOnDestroy() {
    if (this.card) {
      // Unmount the element to prevent memory leaks
      this.card.unmount();
    }
  }

  pay() {
    console.log(this.card)
    this.retrieveCardData()
    this.paymentService.paymentIntent({amount:49.99,currency:'usd',description:'testing'}).subscribe(
        {
          next: (response: any) => {
            this.client_secert = response
            console.log(response)
          },
          error: (error: any) => {
            console.log(error)
          },
          complete: () => {
            console.log('complete?')
            this.stripe.confirmCardPayment(this.client_secert, {
              payment_method: {
                card: this.card,
                billing_details: {
                  name: 'John Doe',
                  email: 'john.doe@example.com',


                  // Add more billing details as needed
                }
              }
            }).then((payementIntent: any) => {
              console.log('sucess?')
              console.log(payementIntent)
            }).catch((err: any) => console.log(err))

          }
        })

  }
  retrieveCardData() {
    this.stripe.createPaymentMethod({ type: 'card', card: this.card })
      .then((result: any) => {

        if (result.error) {
          console.error('Error retrieving card data:', result.error.message);
        } else {
          const card = result.paymentMethod.card;
          console.log('Card brand:', card.brand);
          console.log('Last 4 digits:', card.last4);
          // Perform further actions with the card data
        }
      })
      .catch((error) => {
        console.error('Error retrieving card data:', error);
      });
  }
  async checkout() {
    const session: any = await this.http.post('http://localhost:8080/stripe/create-checkout-session', {}).toPromise();
    const stripe = await this.stripePromise;
    await stripe.redirectToCheckout({ sessionId: session.id });
  }


}

