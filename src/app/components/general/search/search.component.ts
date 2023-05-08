import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Jobs } from 'src/app/classes/jobs';
import { ChatlistService } from 'src/app/services/chatlist.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  search:FormGroup
  jobs:Jobs[]
  jobName:string = ''


  constructor(private jobService:JobsService,
    private message:MessageService,
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder,
    private chatList:ChatlistService){}
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.jobName = params['category'];
    });
    this.fetchJobs()
  }

  createForm():void{
    this.search = this.formBuilder.group({
      search: new FormControl('')
    })
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
  sendMessage(receiverId:string){
    const userId = JSON.parse(localStorage.getItem('user'))['userId']

    this.chatList.addNewUser(userId,receiverId).subscribe({
      next:(_response)=>{
        console.log(_response)
      },
      error:(_error)=>{
        this.router.navigate(['/home/messages'])
      },
      complete:()=>{
        this.router.navigate(['/home/messages'])
      }
    })

  }
}
