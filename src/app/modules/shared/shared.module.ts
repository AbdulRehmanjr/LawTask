import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from 'src/app/components/shared/header/header.component';
import { SubscriptioncardComponent } from 'src/app/components/shared/subscriptioncard/subscriptioncard.component';


@NgModule({
  declarations: [
    SubscriptioncardComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports:[
    SubscriptioncardComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
