import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';


const routes:Routes = [
  {path:'',component:UserComponent}
]

// components
import { UserComponent } from './general.component';
import { HeaderComponent } from '../../components/general/header/header.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { PopularComponent } from '../../components/general/popular/popular.component';
import { FooterComponent } from '../../components/general/footer/footer.component';
@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    IntroComponent,
    PopularComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class GeneralModule { }
