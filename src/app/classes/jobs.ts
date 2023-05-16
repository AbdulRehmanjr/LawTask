import { User } from "./user"

export class Jobs {
  jobId:string
  jobName:string
  jobImage:string
  description:string
  likes:number
  views:number
  jobType:string
  jobPrice:number
  user:User
}
