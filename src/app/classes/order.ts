import { Job } from "./job"
import { User } from "./user"

export class Order {
  id:string
  customerName:String
  customerEmail:string
  description:string
  requirementFile:string
  startedDate:string
  endedDate:string
  price:number
  job:Job
  user:User
  customer:User

}
