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
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';

//* custom modules
import { SharedModule } from '../shared/shared.module';

//* custom components
import { AdminComponent } from './admin.component';
import { SidebarComponent } from '../../components/admin/sidebar/sidebar.component';
import { SellerapprovalComponent } from '../../components/admin/sellerapproval/sellerapproval.component';
import { SellerapprovaldetailComponent } from '../../components/admin/sellerapprovaldetail/sellerapprovaldetail.component';
import { ApprovedRequestsComponent } from '../../components/admin/approved-requests/approved-requests.component';
import { DashboardComponent } from '../../components/admin/dashboard/dashboard.component';
import { CouponComponent } from '../../components/admin/coupon/coupon.component';
import { AdminGuard } from 'src/app/security/admin.guard';
import { WithdrawrequestComponent } from '../../components/admin/withdrawrequest/withdrawrequest.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerService } from 'src/app/interceptor/spinner.service';


const routes: Routes = [
  {
    path: 'admin-dashboard', component: AdminComponent,
    canActivate:[AdminGuard],
    children: [
      {path:'main',component:DashboardComponent},
      { path: 'request-approval', component: SellerapprovalComponent },
      {
        path: 'request-approval-detail/:sellerId', component: SellerapprovaldetailComponent
      },{
        path:'approved-requests',component:ApprovedRequestsComponent
      },
      {
        path:'coupons',component:CouponComponent
      },
      {
        path:'withdraw',component:WithdrawrequestComponent
      },
      {
        path:'',redirectTo:'main',pathMatch:'full'
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
    DashboardComponent,
    CouponComponent,
    WithdrawrequestComponent,
  ],
  imports: [
    BadgeModule,
    TagModule,
    ButtonModule,
    ToolbarModule,
    ChartModule,
    DialogModule,
    TableModule,
    ToastModule,
    MessageModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerService,
      multi: true
    },
    MessageService
  ]
})
export class AdminModule { }
