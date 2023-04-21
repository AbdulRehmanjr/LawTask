import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerModule } from './modules/seller/seller.module';
import { GeneralModule } from './modules/general/general.module';
import { LoginComponent } from './components/general/login/login.component';
import { SignupComponent } from './components/general/signup/signup.component';

const routes: Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  }
];

@NgModule({
  imports: [
    SellerModule,
    GeneralModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
