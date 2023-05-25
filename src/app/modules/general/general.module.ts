import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// prime
import { CarouselModule } from 'primeng/carousel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { SliderModule } from 'primeng/slider';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
// custom modules
import { SharedModule } from '../shared/shared.module';

// components
import { GeneralComponent } from './general.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { PopularComponent } from '../../components/general/popular/popular.component';
import { FooterComponent } from '../../components/general/footer/footer.component';
import { LoginComponent } from '../../components/general/login/login.component';
import { SignupComponent } from '../../components/general/signup/signup.component';
import { RequestSellerComponent } from '../../components/general/request-seller/request-seller.component';
import { MainPortionComponent } from '../../components/general/main-portion/main-portion.component';
import { JobsListComponent } from 'src/app/components/seller/jobs-list/jobs-list.component';
import { SearchComponent } from '../../components/general/search/search.component';
import { CommunicationComponent } from '../../components/general/communication/communication.component';
import { ProfileComponent } from '../../components/general/profile/profile.component';
import { NotfoundComponent } from '../../components/general/notfound/notfound.component';
import { MakeOrderComponent } from '../../components/general/make-order/make-order.component';
import { OrderhistoryComponent } from '../../components/general/orderhistory/orderhistory.component';
import { ConfirmorderComponent } from '../../components/general/confirmorder/confirmorder.component';

import { LinkifyPipe } from 'src/app/pipes/linkify.pipe';
import { FilessharingComponent } from '../../components/general/filessharing/filessharing.component';
import { FiledetailsComponent } from '../../components/general/filedetails/filedetails.component';
import { GeneralGuard } from 'src/app/security/general.guard';
import { TermofuseComponent } from '../../components/general/termofuse/termofuse.component';
import { PrivacyComponent } from '../../components/general/privacy/privacy.component';
import { SubscriptioncardComponent } from 'src/app/components/shared/subscriptioncard/subscriptioncard.component';
import { EditprofileComponent } from '../../components/general/editprofile/editprofile.component';
import { ForgotpassordComponent } from '../../components/general/forgotpassord/forgotpassord.component';

const routes: Routes = [
  {
    path: 'home', component: GeneralComponent,
    canActivate: [GeneralGuard],
    children: [
      {
        path: '', component: MainPortionComponent
      },
      {
        path: 'seller-request', component: RequestSellerComponent
      },
      {
        path: 'profile', component: ProfileComponent
      },

      {
        path: 'payment', component: SubscriptioncardComponent
      },
      {
        path: 'job-list', component: JobsListComponent
      },
      {
        path:'edit-profile',component:EditprofileComponent
      },
      {
        path:'forgot-password',component:ForgotpassordComponent
      },
      {
        path: 'search', component: SearchComponent
      }, {
        path: 'files', component: FilessharingComponent
      }, {
        path: 'files-detail/:orderId/:customerId/:userId', component: FiledetailsComponent
      },
      {
        path: 'messages', component: CommunicationComponent
      },
      {
        path: 'order', component: OrderhistoryComponent
      },
      {
        path: 'make-order', component: MakeOrderComponent
      },
      {
        path: 'order-confirm', component: ConfirmorderComponent
      }, {
        path: 'term-of-use', component: TermofuseComponent
      },
      {
        path: 'privacy-policy', component: PrivacyComponent
      }, {
        path: 'terms', component: TermofuseComponent
      }
    ]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },


]
@NgModule({
  declarations: [
    LinkifyPipe,
    GeneralComponent,
    IntroComponent,
    PopularComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    RequestSellerComponent,
    MainPortionComponent,
    SearchComponent,
    CommunicationComponent,
    ProfileComponent,
    NotfoundComponent,
    MakeOrderComponent,
    OrderhistoryComponent,
    ConfirmorderComponent,
    FilessharingComponent,
    FiledetailsComponent,
    TermofuseComponent,
    PrivacyComponent,
    EditprofileComponent,
    ForgotpassordComponent,
  ],
  imports: [
    ButtonModule,
    ToolbarModule,
    TagModule,
    TableModule,
    DialogModule,
    BadgeModule,
    PaginatorModule,
    SidebarModule,
    RatingModule,
    CarouselModule,
    SelectButtonModule,
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
