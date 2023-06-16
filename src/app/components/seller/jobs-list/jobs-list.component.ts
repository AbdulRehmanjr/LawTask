import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Job } from 'src/app/classes/job';
import { Seller } from 'src/app/classes/seller';
import { JobsService } from 'src/app/services/jobs.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {


  private userId:string = ''
  seller:Seller
  showSubscription: boolean = false
  jobs:Job[]
  maxJobs:number = 0
  leftJobs:number = 0
  @Input()
  actionForm: boolean
  displayDialog:boolean = false
  editDialog:boolean = false
  editJob:Job
  stateOptions: any[] = [
    { label: 'Fixed', value: 'Fixed' },
    { label: 'Hourly', value: 'Hourly' }
  ];
  constructor(
    private sellerService: SellerService,
    private jobService:JobsService,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user'))['userId']
    this.fetchSeller()
    this.fetchJobsBySeller()
  }



  fetchJobsBySeller():void{
    this.jobService.getJobsByUserId(this.userId).subscribe({
      next:(response:Job[])=>{

        this.jobs = response

      },
      error:(error:any)=>{

        this.messageService.add({ severity: 'info', summary: 'No Job', detail: 'No job found' })
      },
      complete:()=>{

      }
    })
  }
  fetchSeller(): void {
    const userId = JSON.parse(localStorage.getItem('user'))['userId']

    this.sellerService.getSeller(userId).subscribe(
      {
        next: (response: Seller) => {
          this.seller=response

          if (response.active == false) {
            this.showSubscription = true
          }
        },
        error: (error: any) => {

        },
        complete: () => {

          this.maxJobs = this.seller.maxJobs
          this.leftJobs = this.maxJobs - this.seller.currentJobs
        }
      }
    )
  }
  editJobDialog(job:Job){
    this.editDialog = true
    this.editJob = job
  }
  editSubmit(){

    this.jobService.editJob(this.editJob).subscribe({
      next: (response: Job) => {
          this.messageService.add({
            severity:'success',
            summary:'Success'
          })
      },
      error: (error: any) => {
        this.messageService.add({
          severity:'error',
          summary:'Error'
        })
      },
      complete: () => {
        this.editDialog = false
        this.fetchJobsBySeller()
      }

    })
  }
  hideDialog() {
    this.displayDialog = false
    this.fetchJobsBySeller()
    this.maxJobs = this.maxJobs +1
    this.leftJobs = this.leftJobs
    this.fetchSeller()
  }
  showDialog() {
    this.displayDialog = true
  }
}
