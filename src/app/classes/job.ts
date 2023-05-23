import { User } from "./user"

export class Job {
  jobId:string
  jobName:string
  jobImage:string
  description:string
  jobType:string
  jobPrice:number
  user:User
}
