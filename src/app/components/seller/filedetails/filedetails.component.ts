import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploader } from 'src/app/classes/file';
import { FileService } from 'src/app/services/file.service';

import * as fileSaver from 'file-saver'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/classes/order';

@Component({
  selector: 'app-filedetails',
  templateUrl: './filedetails.component.html',
  styleUrls: ['./filedetails.component.css']
})
export class FiledetailsComponent implements OnInit {



  files: FileUploader[]
  private userId: string = ''
  displayDialog: boolean = false
  fileForm: FormGroup
  orderId: string = ''
  customerId: string = ''
  sellerId: string = ''
  uploadFile: File


  constructor(
    private fileService: FileService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')
    this.customerId = this.route.snapshot.paramMap.get('customerId')
    this.sellerId = this.route.snapshot.paramMap.get('userId')
    this.userId = JSON.parse(localStorage.getItem('user'))['userId']
    this.fileForm = this.fb.group({
      description: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
    this.fetchFile()
  }

  fetchFile() {
    this.fileService.getFilesByOrder(this.orderId).subscribe({
      next:(response:FileUploader[])=>{
        this.files = response
      },
      error:(_error:any)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File Fetching Error'
        })
      },complete:()=>{

      }
    })
  }

  onSubmit() {


    let fileSaver = new FileUploader()
    let order = new Order()
    fileSaver.description = this.fileForm.get('description').value
    fileSaver.customerId = this.customerId
    fileSaver.userId = this.sellerId
    order.id = this.orderId
    fileSaver.order = order



    this.fileService.saveFiles(this.uploadFile, fileSaver).subscribe(
      {
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'File Saved'
          })
        },
        error: (_error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'File Saving Error'
          })
        },
        complete: () => {
          this.displayDialog = false
          this.fetchFile()
        }
      }
    )
  }
  getFile(event: any) {
    this.uploadFile = event.target.files[0]
  }
  download(downloadFile: FileUploader) {

    const byteCharacters = atob(downloadFile.file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: `${downloadFile.fileType}` })
    fileSaver.saveAs(file, `${downloadFile.fileName}.${downloadFile.fileType.split('/')[1]}`)
  }

  showDialog() {
    this.displayDialog = true
  }
}
