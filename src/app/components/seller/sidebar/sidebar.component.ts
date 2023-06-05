import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seller-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit{

  userId:string = ''


  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user'))['userId']
  }

}
