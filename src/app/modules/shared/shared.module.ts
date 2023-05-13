import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from 'src/app/components/shared/header/header.component';
import { SubscriptioncardComponent } from 'src/app/components/shared/subscriptioncard/subscriptioncard.component';

import { DialogModule } from 'primeng/dialog';

import { StripeModule } from 'stripe-angular';
import { StripecardComponent } from '../../components/shared/stripecard/stripecard.component';

@NgModule({
  declarations: [
    SubscriptioncardComponent,
    HeaderComponent,
    StripecardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    StripeModule,
    RouterModule,
    CommonModule,
  ],
  exports:[
    SubscriptioncardComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
