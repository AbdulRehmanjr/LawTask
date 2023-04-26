import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { SellerRequest } from 'src/app/classes/seller-request';
import { appState } from 'src/app/ngrx/states/appState';
import { sellerRequestIsFetchedSeletor, errorSelector, sellerRequestSelector } from 'src/app/ngrx/selectors/SellerRequestSelector'
import * as sellerAction from 'src/app/ngrx/actions/SellerRequestAction'


@Component({
  selector: 'app-sellerapproval',
  templateUrl: './sellerapproval.component.html',
  styleUrls: ['./sellerapproval.component.css']
})
export class SellerapprovalComponent implements OnInit {

  sellerRequest: SellerRequest[] = []
  sellerRequest$: Observable<SellerRequest[]>
  fetched$: Observable<boolean>
  error$: Observable<string | null>
  isfetched: boolean
  error:string = null

  constructor(
    private MessageService: MessageService,
    private store: Store<appState>) {
    this.fetched$ = this.store.select<boolean>(sellerRequestIsFetchedSeletor)
    this.sellerRequest$ = this.store.pipe(select(sellerRequestSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }

  ngOnInit(): void {

   this.error$.subscribe(
      {
        next:(response)=>{
          this.error= response
          this.MessageService.add({ severity: 'error', summary: 'Error', detail: `No request Found` })
        },
        complete:()=>{

        }
      }
    )
    this.fetchRequests()
  }

  fetchRequests() {

    this.fetched$
    .subscribe(
      {
       next: (data) =>{
         this.isfetched = data
        if(this.isfetched == false && this.error==null ){
          this.store.dispatch(sellerAction.getAllSellerRequests())
        }
       }
      }
     )

  }
}
