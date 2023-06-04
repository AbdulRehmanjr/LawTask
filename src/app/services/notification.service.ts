import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = `${environment.apiBaseUrl}/${environment.notification}`
  constructor(private http:HttpClient) { }

  getAllNotifications(userId:string){
    return this.http.get(`${this.url}/${userId}`,{
      observe:'body'
    })
  }
}
