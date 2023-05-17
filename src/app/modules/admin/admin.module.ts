import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//* ng prime
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { SliderModule } from 'primeng/slider';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';



//* custom modules
import { SharedModule } from '../shared/shared.module';

//* custom components
import { AdminComponent } from './admin.component';
import { SidebarComponent } from '../../components/admin/sidebar/sidebar.component';
import { SellerapprovalComponent } from '../../components/admin/sellerapproval/sellerapproval.component';
import { SellerapprovaldetailComponent } from '../../components/admin/sellerapprovaldetail/sellerapprovaldetail.component';
import { ApprovedRequestsComponent } from '../../components/admin/approved-requests/approved-requests.component';
import { DashboardComponent } from '../../components/admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin-dashboard', component: AdminComponent,
    children: [
      {path:'',component:DashboardComponent},
      { path: 'request-approval', component: SellerapprovalComponent },
      {
        path: 'request-approval-detail/:sellerId', component: SellerapprovaldetailComponent
      },{
        path:'approved-requests',component:ApprovedRequestsComponent
      }
    ]
  }
]


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    SellerapprovalComponent,
    SellerapprovaldetailComponent,
    ApprovedRequestsComponent,
    DashboardComponent
  ],
  imports: [
    ChartModule,
    DialogModule,
    TableModule,
    ToastModule,
    MessageModule,
    MultiSelectModule,
    ChipModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MessageService
  ]
})
export class AdminModule { }
