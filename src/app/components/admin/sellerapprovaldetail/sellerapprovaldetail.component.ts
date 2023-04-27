import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, reduce } from 'rxjs';
import { SellerRequest } from 'src/app/classes/seller-request';
import { sellerRequestIsFetchedSeletor, sellerRequestSelector, errorSelector } from 'src/app/ngrx/selectors/SellerRequestSelector';
import { appState } from 'src/app/ngrx/states/appState';
import * as sellerAction from 'src/app/ngrx/actions/SellerRequestAction'

@Component({
  selector: 'app-sellerapprovaldetail',
  templateUrl: './sellerapprovaldetail.component.html',
  styleUrls: ['./sellerapprovaldetail.component.css']
})
export class SellerapprovaldetailComponent implements OnInit {

  rate: number = 10
  sellerForm: FormGroup
  disableSkills: boolean = false
  selectedSkills: string[] = []



  sellerId: string = ''
  seller: SellerRequest
  sellerRequest$: Observable<SellerRequest[]>
  fetched$: Observable<boolean>
  error$: Observable<string | null>
  pdfUrl: string;


  constructor(private activeRoute: ActivatedRoute,
    private store: Store<appState>) {
    this.fetched$ = this.store.select<boolean>(sellerRequestIsFetchedSeletor)
    this.sellerRequest$ = this.store.pipe(select(sellerRequestSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }
  ngOnInit(): void {
    // this.creatingForm()
    this.sellerId = this.activeRoute.snapshot.paramMap.get('sellerId')

    this.fetchSellerDetail()
  }


  /**
   * @function GET Single userId
   * @since v1.0.0
   * @required sellerId
   */
  fetchSellerDetail() {
    this.fetched$.subscribe(
      {
        next:(value)=>{
          console.log('value')
          if(value==false){
            this.store.dispatch(sellerAction.getAllSellerRequests())
          }
          this.sellerRequest$.subscribe(
            {
              next: (data) => {
                console.log(this.seller)
                data.forEach(
                  (data) => {
                    if (data.sellerId === this.sellerId) {
                      this.seller = data
                    }

                  }
                )
              }
              , error: (error: any) => {
                console.log('errror in finding user')
              }
              , complete: () => {
                const byteCharacters = Buffer.from(this.seller.document,'base64');


                const pdfBlob = new Blob([byteCharacters], { type: 'application/pdf' });


                 this.pdfUrl = URL.createObjectURL(pdfBlob);
              }
            }
          )
        },
        error:(err)=>{
          console.log('error in fetching true or false')
        },

      }
    )

  }

}

