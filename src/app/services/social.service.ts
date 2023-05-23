import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private URL = `${environment.apiBaseUrl}/${environment.social}`
  constructor(private http:HttpClient) { }


  getAllSocials(){
    return this.http.get(`${this.URL}/all`,{
      observe:'body'
    })
  }
}
