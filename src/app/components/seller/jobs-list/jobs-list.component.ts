import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Jobs } from 'src/app/classes/jobs';
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
  jobs:Jobs[]
  @Input()
  actionForm: boolean
  displayDialog:boolean = false
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
      next:(response:Jobs[])=>{
        this.jobs = response
      },
      error:(error:any)=>{
        console.log('error',error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in fetching Jobs.' })
      },
      complete:()=>{
        console.log('jobs fetching by userId completed')
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
          console.error(error)
        },
        complete: () => {
          console.log('completed function fetch seller')
        }
      }
    )
  }

  hideDialog() {
    this.displayDialog = false
    this.fetchJobsBySeller()
  }
  showDialog() {
    this.displayDialog = true
  }
}
