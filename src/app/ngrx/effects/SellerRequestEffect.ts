import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SellerrequestService } from 'src/app/services/sellerrequest.service';
import * as sellerAction from 'src/app/ngrx/actions/SellerRequestAction'
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SellerRequest } from 'src/app/classes/seller-request';



@Injectable()
export class SellerRequestEffect {

    constructor(private action$:Actions,
        private sellerService:SellerrequestService){}

    getAllSellerRequests$ = createEffect(
        ()=>{
            return this.action$.pipe(
                ofType(sellerAction.getAllSellerRequests),
                mergeMap(
                    (): Observable<any> => {
                        return this.sellerService.getPendingRequest()
                            .pipe(
                                map((data:any) => sellerAction.getAllSellerRequestsSuccess({sellers:data})),
                                catchError(error => of(sellerAction.getAllSellerRequestsError({ error: error.message })))
                            )
                    }
                )
            )
        }
    )
}
