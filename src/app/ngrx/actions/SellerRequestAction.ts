import { createAction, props } from "@ngrx/store"
import { SellerRequest } from "src/app/classes/seller-request"


export const getAllSellerRequests = createAction('[SellerRequest] invoke SellerRequest Fetch API')

export const getAllSellerRequestsSuccess = createAction('[SellerRequest] SellerRequest Fetch API success',
   props<{ sellers:SellerRequest[]}>()
)

export const getAllSellerRequestsError = createAction('[SellerRequest] SellerRequest Fetch API error',
   props<{ error: string }>()
)
