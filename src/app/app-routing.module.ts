import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerModule } from './modules/seller/seller.module';
import { GeneralModule } from './modules/general/general.module';
import { LoginComponent } from './components/general/login/login.component';
import { SignupComponent } from './components/general/signup/signup.component';
import { AdminModule } from './modules/admin/admin.module';
import { SharedModule } from 'primeng/api';
import { NotfoundComponent } from './components/general/notfound/notfound.component';


const routes: Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'not-found',component:NotfoundComponent
  }

];

@NgModule({
  imports: [

    SharedModule,
    AdminModule,
    SellerModule,
    GeneralModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
