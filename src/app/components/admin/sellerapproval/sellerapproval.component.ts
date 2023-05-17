import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, take } from 'rxjs';
import { SellerRequest } from 'src/app/classes/seller-request';
import { appState } from 'src/app/ngrx/states/appState';
import { sellerRequestIsFetchedSeletor, errorSelector, sellerRequestSelector } from 'src/app/ngrx/selectors/SellerRequestSelector'
import * as sellerAction from 'src/app/ngrx/actions/SellerRequestAction'
import { SellerrequestService } from 'src/app/services/sellerrequest.service';


@Component({
  selector: 'app-sellerapproval',
  templateUrl: './sellerapproval.component.html',
  styleUrls: ['./sellerapproval.component.css']
})
export class SellerapprovalComponent implements OnInit {

  sellerRequests: SellerRequest[]

  error: string = null

  constructor(
    private MessageService: MessageService,
    private sellerService:SellerrequestService,
   ) {

  }

  ngOnInit(): void {
    this.fetchAllRequests()
  }

  fetchAllRequests():void{
    this.sellerService.getPendingRequest().subscribe({
      next:(response:SellerRequest[])=>{

        this.sellerRequests = response
      },
      error:(error:any)=>{
        this.MessageService.add({ severity: 'error', summary: 'Error', detail: 'Network error.' })
      },
      complete:()=>{
        console.log('completed')
      }
    })
  }


}
