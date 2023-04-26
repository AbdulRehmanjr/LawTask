import { SellerRequest } from "src/app/classes/seller-request"

export class SellerRequestState{
  isFetched:boolean
  sellers:SellerRequest[]
  error:string|null
}
