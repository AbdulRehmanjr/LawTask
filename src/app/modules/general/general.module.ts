import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

// prime
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

const routes:Routes = [
  {path:'',component:UserComponent}
]

// components
import { UserComponent } from './general.component';
import { HeaderComponent } from '../../components/general/header/header.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { PopularComponent } from '../../components/general/popular/popular.component';
import { FooterComponent } from '../../components/general/footer/footer.component';
import { LoginComponent } from '../../components/general/login/login.component';
import { SignupComponent } from '../../components/general/signup/signup.component';
@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    IntroComponent,
    PopularComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
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
  exports:[RouterModule],
  providers:[
    MessageService
  ]
})
export class GeneralModule { }
