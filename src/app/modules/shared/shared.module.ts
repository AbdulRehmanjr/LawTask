import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from 'src/app/components/shared/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class SharedModule { }
