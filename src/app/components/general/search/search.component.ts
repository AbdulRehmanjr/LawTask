import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Jobs } from 'src/app/classes/jobs';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  jobs:Jobs[]
  jobName:string = ''

  constructor(private jobService:JobsService,
    private message:MessageService,
    private router:ActivatedRoute){}
  ngOnInit(): void {

    this.router.queryParams.subscribe(params => {
      this.jobName = params['category'];
    });
    this.fetchJobs()
  }

  fetchJobs():void{
    this.jobService.getJobsByJobName(this.jobName).subscribe({
      next:(response:Jobs[])=>{
        this.jobs = response
      },
      error:(error:any)=>{
        this.message.add({ severity: 'error', summary: 'error', detail: 'No Job or service found.' })
      },
      complete:()=>{
        console.log('completed')
      }
    })
  }
}
