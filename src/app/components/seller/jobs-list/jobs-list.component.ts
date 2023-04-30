import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/classes/seller';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit{


  showSubscription:boolean = true
  constructor(
    private sellerService:SellerService
  ){}

  ngOnInit(): void {

    this.fetchSeller()
  }


  fetchSeller():void{
    const userId  = JSON.parse(localStorage.getItem('user'))['userId']

    this.sellerService.getSeller(userId).subscribe(
      {
        next:(response:Seller)=>{
          if(response.active == true){
              this.showSubscription = false
          }
        },
        error:(error:any)=>{
          console.error(error)
        },
        complete:()=>{
          console.log('completed function fetch seller')
        }
      }
    )
  }
}
