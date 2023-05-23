import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from 'src/app/components/shared/header/header.component';
import { SubscriptioncardComponent } from 'src/app/components/shared/subscriptioncard/subscriptioncard.component';

import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  declarations: [
    SubscriptioncardComponent,
    HeaderComponent
  ],
  imports: [
    SidebarModule,
    ToastModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule,
    CommonModule,
  ],
  exports:[
    SubscriptioncardComponent,
    HeaderComponent
  ],
  providers:[MessageService]
})
export class SharedModule { }
