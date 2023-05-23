import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// ng prime
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';


// custom modules
import { SharedModule } from '../shared/shared.module';
import { SellerComponent } from './seller.component';
import { JobsListComponent } from '../../components/seller/jobs-list/jobs-list.component';
import { AddJobComponent } from '../../components/seller/add-job/add-job.component';
import { DashboardComponent } from '../../components/seller/dashboard/dashboard.component';
import { SidebarComponent } from '../../components/seller/sidebar/sidebar.component';
import { CommunicationComponent } from 'src/app/components/general/communication/communication.component';
import { PendingordersComponent } from '../../components/seller/pendingorders/pendingorders.component';
import { FilessharingComponent } from '../../components/seller/filessharing/filessharing.component';
import { FiledetailsComponent } from '../../components/seller/filedetails/filedetails.component';
import { SellerGuard } from 'src/app/security/seller.guard';




const routes: Routes = [
  {
    path: 'seller-dashboard', component: SellerComponent,
    canActivate:[SellerGuard],
    children: [
      {
        path:'',component:DashboardComponent
      },
      { path: 'messages', component: CommunicationComponent },
      {
        path: 'orders', component: PendingordersComponent
      },{
        path:'files',component:FilessharingComponent
      },{
        path:'files-detail/:orderId/:customerId/:userId',component:FiledetailsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    SellerComponent,
    JobsListComponent,
    AddJobComponent,
    DashboardComponent,
    SidebarComponent,
    PendingordersComponent,
    FilessharingComponent,
    FiledetailsComponent,

  ],
  imports: [
    SelectButtonModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    MessageModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MessageService
  ]
})
export class SellerModule { }
