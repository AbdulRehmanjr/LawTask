import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//* ng prime
import {  SliderModule } from 'primeng/slider';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';

//* custom modules
import { SharedModule } from '../shared/shared.module';

//* cusotm components
import { AdminComponent } from './admin.component';
import { SidebarComponent } from '../../components/admin/sidebar/sidebar.component';
import { SellerapprovalComponent } from '../../components/admin/sellerapproval/sellerapproval.component';
import { SellerapprovaldetailComponent } from '../../components/admin/sellerapprovaldetail/sellerapprovaldetail.component';

const routes :Routes = [
  {
    path:'admin-dashboard',component:AdminComponent,
    children:[
      {path:'request-approval',component:SellerapprovalComponent},
      {
        path:'request-approval-detail',component:SellerapprovaldetailComponent
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
    MultiSelectModule,
    ChipModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AdminModule { }
