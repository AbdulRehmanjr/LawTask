import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// prime
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { SliderModule } from 'primeng/slider';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';

// custom modules
import { SharedModule } from '../shared/shared.module';

// components
import { UserComponent } from './general.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { PopularComponent } from '../../components/general/popular/popular.component';
import { FooterComponent } from '../../components/general/footer/footer.component';
import { LoginComponent } from '../../components/general/login/login.component';
import { SignupComponent } from '../../components/general/signup/signup.component';
import { SubscriptioncardComponent } from '../../components/general/subscriptioncard/subscriptioncard.component';
import { RequestSellerComponent } from '../../components/general/request-seller/request-seller.component';
import { MainPortionComponent } from '../../components/general/main-portion/main-portion.component';


const routes: Routes = [
  {
    path: 'home', component: UserComponent,
    children: [
      {
        path: '', component: MainPortionComponent
      },
      {
        path:'seller-request',component:RequestSellerComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'signup', component: SignupComponent
      },
    ]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },


]
@NgModule({
  declarations: [

    UserComponent,
    IntroComponent,
    PopularComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SubscriptioncardComponent,
    RequestSellerComponent,
    MainPortionComponent,
  ],
  imports: [
    SliderModule,
    ChipModule,
    MultiSelectModule,
    SharedModule,
    ToastModule,
    BrowserAnimationsModule,
    BrowserModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    MessageService
  ]
})
export class GeneralModule { }
