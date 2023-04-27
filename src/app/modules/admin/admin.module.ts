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


export class AppModule { }

//* ngrx imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SellerRequestReducer } from 'src/app/ngrx/reducers/SellerRequestReducer';
import { SellerRequestEffect } from 'src/app/ngrx/effects/SellerRequestEffect';

//* custom modules
import { SharedModule } from '../shared/shared.module';

//* custom components
import { AdminComponent } from './admin.component';
import { SidebarComponent } from '../../components/admin/sidebar/sidebar.component';
import { SellerapprovalComponent } from '../../components/admin/sellerapproval/sellerapproval.component';
import { SellerapprovaldetailComponent } from '../../components/admin/sellerapprovaldetail/sellerapprovaldetail.component';

const routes: Routes = [
  {
    path: 'admin-dashboard', component: AdminComponent,
    children: [
      { path: 'request-approval', component: SellerapprovalComponent },
      {
        path: 'request-approval-detail/:sellerId', component: SellerapprovaldetailComponent
      }
    ]
  }
]


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    SellerapprovalComponent,
    SellerapprovaldetailComponent
  ],
  imports: [
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
    StoreModule.forFeature('sellerRequests', SellerRequestReducer),
    EffectsModule.forFeature([SellerRequestEffect])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MessageService
  ]
})
export class AdminModule { }
