import { User } from "./user"

export class Job {
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
