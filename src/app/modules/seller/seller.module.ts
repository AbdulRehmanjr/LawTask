import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { RouterModule, Routes } from '@angular/router';


const routes :Routes = []

@NgModule({
  declarations: [
    SellerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class SellerModule { }
