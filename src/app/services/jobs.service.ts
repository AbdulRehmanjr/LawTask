import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../classes/job';
import { environment } from '../variables/environment ';
import { catchError, concatAll, forkJoin, map, of, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private baseUrl = `${environment.apiBaseUrl}/${environment.job}`
  constructor(private http: HttpClient) { }

  saveJob(job: Job, image: File) {

    const formData = new FormData()
    formData.append('image', image)
    formData.append('job', JSON.stringify(job))

    return this.http.post(`${this.baseUrl}/save`, formData, { observe: 'body' })
  }

  getJobsByUserId(userId: string) {
    return this.http.get(`${this.baseUrl}/${userId}`, { observe: 'body' })
  }

  getJobsByJobName(jobName: string) {
    let params = new HttpParams().set('jobName', jobName)
    return this.http.get(`${this.baseUrl}/search`, { params: params, observe: 'body' })
  }
  getJobsByCategoryName(categoryName: string) {
    return this.http.get(`${this.baseUrl}/search/${categoryName}`, { observe: 'body' })
  }
  editJob(job: Job) {
    return this.http.post(`${this.baseUrl}/edit`, job, {
      observe: 'body'
    })
  }
  getAlljobs(keyword: string) {
    return forkJoin([this.getJobsByJobName(keyword).pipe(
      catchError(error => {

        return of([]);
      })
    ),
    this.getJobsByCategoryName(keyword).pipe(
      catchError(error => {
        return of([]);
      })
    )]).pipe(
        concatAll(),
        toArray()
    )
  }
  getAllJobsByCategory(categoryId:number){

    return this.http.get(`${this.baseUrl}/category/${categoryId}`,{
      observe:'body'
    })
  }

  getAll(){
      return this.http.get(`${this.baseUrl}/all`,{
        observe:'body'
      })
  }
}
