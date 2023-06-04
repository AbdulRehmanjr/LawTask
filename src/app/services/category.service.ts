import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${environment.apiBaseUrl}/${environment.category}`
  constructor(private http:HttpClient) { }

  getAllCategories(){
    return this.http.get(`${this.url}/all`,{
      observe:'body'
    })
  }
}
