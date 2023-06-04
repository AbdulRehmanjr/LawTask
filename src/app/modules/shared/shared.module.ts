import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from 'src/app/components/shared/header/header.component';
import { SubscriptioncardComponent } from 'src/app/components/shared/subscriptioncard/subscriptioncard.component';
import { NotfoundComponent } from 'src/app/components/shared/notfound/notfound.component';

import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { Badge, BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [
    NotfoundComponent,
    SubscriptioncardComponent,
    HeaderComponent
  ],
  imports: [
    BadgeModule,
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
    NotfoundComponent,
    SubscriptioncardComponent,
    HeaderComponent
  ],
  providers:[MessageService]
})
export class SharedModule { }
