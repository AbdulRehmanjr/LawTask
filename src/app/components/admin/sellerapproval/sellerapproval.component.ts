import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { SellerRequest } from 'src/app/classes/seller-request';
import { appState } from 'src/app/ngrx/states/appState';
import {sellerRequestIsFetchedSeletor,errorSelector,sellerRequestSelector} from 'src/app/ngrx/selectors/SellerRequestSelector'
import * as sellerAction from 'src/app/ngrx/actions/SellerRequestAction'
import { SellerrequestService } from 'src/app/services/sellerrequest.service';

@Component({
  selector: 'app-sellerapproval',
  templateUrl: './sellerapproval.component.html',
  styleUrls: ['./sellerapproval.component.css']
})
export class SellerapprovalComponent  implements OnInit{

  sellerRequest:SellerRequest[]=[]
  sellerRequest$:Observable<SellerRequest[]>
  fetched$:Observable<boolean>
  error$:Observable<string|null>
  isfetched:boolean


  constructor(private sellerService:SellerrequestService,
    private MessageService:MessageService,
    private store:Store<appState>){
      this.sellerRequest$ = this.store.pipe(select(sellerRequestSelector))
      this.fetched$ =this.store.select<boolean>(sellerRequestIsFetchedSeletor)
      this.error$ = this.store.pipe(select(errorSelector))
    }

  ngOnInit(): void {
    this.fetchRequests()
  }

  fetchRequests(){
    this.fetched$
    .subscribe(
      {
       next: data =>{
         this.isfetched = data
         if(this.isfetched == false){
           this.store.dispatch(sellerAction.getAllSellerRequests())
         }
       },
       error: err=>{
         console.log(err)
       },
       complete: ()=>{
        console.log('completed')
       }
      }
     )
    // this.sellerService.getPendingRequest().subscribe({
    //   next:(data:SellerRequest[])=>{
    //     this.sellerRequest = data
    //   },
    //     error:(error:any)=>{
    //       console.log(error)
    //       this.MessageService.add({ severity: 'error', summary: 'Error', detail: `No request Found` })
    //     },
    //     complete:()=>{

    //     }
    //   }
    //)
  }
}
