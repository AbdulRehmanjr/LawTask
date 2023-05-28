import { Component } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {

sidebarVisible:boolean = false
  showSideBar() {
    this.sidebarVisible = true
  }
}
