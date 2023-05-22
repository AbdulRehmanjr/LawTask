import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment ';
import { Order } from '../classes/order';
import { FileUploader } from '../classes/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private URL = `${environment.apiBaseUrl}/${environment.file}`
  constructor(private http:HttpClient) { }


  saveFiles(file:File,fileSaver:FileUploader){

    let formData = new FormData()

    formData.append('file',file)
    formData.append('metaData',JSON.stringify(fileSaver))

    return this.http.post(`${this.URL}/save`,formData,{
      observe:'body'
    })
  }

  getFilesByOrder(orderId:string){

    return this.http.get(`${this.URL}/order/${orderId}`,{
      observe:'body'
    })
  }

}
