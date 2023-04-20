import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerModule } from './modules/seller/seller.module';
import { GeneralModule } from './modules/general/general.module';

const routes: Routes = [];

@NgModule({
  imports: [
    SellerModule,
    GeneralModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
