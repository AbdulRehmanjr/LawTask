import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, reduce } from 'rxjs';
import { SellerRequest } from 'src/app/classes/seller-request';
import { sellerRequestIsFetchedSeletor, sellerRequestSelector, errorSelector } from 'src/app/ngrx/selectors/SellerRequestSelector';
import { appState } from 'src/app/ngrx/states/appState';
import * as sellerAction from 'src/app/ngrx/actions/SellerRequestAction'
import * as fileSave from 'file-saver'
import { SellerrequestService } from 'src/app/services/sellerrequest.service';

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
  isDisplay:boolean=false



  constructor(private activeRoute: ActivatedRoute,
    private router:Router,
    private sellerService: SellerrequestService) {

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
    this.sellerService.getSellserBySellerId(this.sellerId).subscribe({

      next: (response: SellerRequest) => {
        this.seller = response

      },
      error: (err) => {
        console.log('error in fetching')
      },
      complete: () => {

      }

    })


  }

  download(): void {

    const byteCharacters = atob(this.seller.document);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const image = new Blob([byteArray], { type: `${this.seller.documentType}` })

    fileSave.saveAs(image, `${this.seller.firstName}.${this.seller.documentType.split('/')[1]}`)
  }

  showDialog():void{
    this.isDisplay = true
  }

  accept():void{
    this.sellerService.acceptRequestBySellerId(this.sellerId).subscribe(
      {
        next:(value)=>{
          console.log('value',value)
        },
        error:(error)=>{
          console.log('error',error)
        },
        complete:()=>{
          console.log('request updated success')
          this.router.navigate(['/admin-dashboard/request-approval'])
        }
      }
    )
  }
}

