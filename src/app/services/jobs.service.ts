import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../classes/job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private baseUrl  = 'http://localhost:8080/api/v1/job'
  constructor(private http:HttpClient) { }

  saveJob(job:Job,image:File){

    const formData = new FormData()
    formData.append('image', image)
    formData.append('job',JSON.stringify(job))

    return this.http.post(`${this.baseUrl}/save`, formData,{observe:'body'})
  }

  getJobsByUserId(userId:string){
    return this.http.get(`${this.baseUrl}/${userId}`,{observe:'body'})
  }

  getJobsByJobName(jobName:string){
    let params = new HttpParams().set('jobName', jobName)
    return this.http.get(`${this.baseUrl}/search`,{params:params,observe:'body'})
  }
}
