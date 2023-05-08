import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';

// ng prime
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import {  ToastModule } from 'primeng/toast';
// custom modules
import { SharedModule } from '../shared/shared.module';
import { SellerComponent } from './seller.component';
import { JobsListComponent } from '../../components/seller/jobs-list/jobs-list.component';
import { AddJobComponent } from '../../components/seller/add-job/add-job.component';
import { DashboardComponent } from '../../components/seller/dashboard/dashboard.component';
import { SidebarComponent } from '../../components/seller/sidebar/sidebar.component';
import { CommunicationComponent } from 'src/app/components/general/communication/communication.component';



const routes :Routes = [
  {path:'seller-dashboard',component:SellerComponent,
  children:[
    {path:'messages',component:CommunicationComponent}
  ]}
]

@NgModule({
  declarations: [
    SellerComponent,
    JobsListComponent,
    AddJobComponent,
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    ToastModule,
    DialogModule,
    MessageModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
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
