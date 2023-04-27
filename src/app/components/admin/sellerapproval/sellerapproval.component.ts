import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, take } from 'rxjs';
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

  sellerRequests: SellerRequest[]
  sellerRequests$: Observable<SellerRequest[]>
  fetched$: Observable<boolean>
  error$: Observable<string | null>
  isfetched: boolean
  error: string = null

  constructor(
    private MessageService: MessageService,
    private store: Store<appState>) {
    this.fetched$ = this.store.select<boolean>(sellerRequestIsFetchedSeletor)
    this.sellerRequests$ = this.store.pipe(select(sellerRequestSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }

  ngOnInit(): void {

    this.error$.subscribe(
      {
        next: (response) => {
          this.error = response
          this.MessageService.add({ severity: 'error', summary: 'Error', detail: `No request Found` })
        },
        complete: () => {

        }
      }
    )
    this.fetchRequests()
  }

  fetchRequests() {

    this.fetched$
      .pipe(take(1))
      .subscribe(
        {
          next: (data) => {
            this.isfetched = data
            if (this.isfetched == false && this.error == null) {
              this.store.dispatch(sellerAction.getAllSellerRequests())
            }
          },
          error: (_err) => {
            console.log('error',_err)
          },
          complete: () => {
           this.sellerRequests$
           .pipe(take(2)).
           subscribe(
            {
              next: (data) => {
                this.sellerRequests = data

              },
              error: (_err) => {
                console.log('error',_err)
              },
              complete:()=>{

              }
            }
           )
          }
        }
      )

  }
}
