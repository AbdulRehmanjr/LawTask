import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';


import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
// custom modules
import { SharedModule } from '../shared/shared.module';
import { SellerComponent } from './seller.component';
import { JobsListComponent } from '../../components/seller/jobs-list/jobs-list.component';



const routes :Routes = []

@NgModule({
  declarations: [
    SellerComponent,
    JobsListComponent
  ],
  imports: [
    MessageModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
  providers:[
    MessageService
  ]
})
export class SellerModule { }
