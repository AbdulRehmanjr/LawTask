import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Jobs } from 'src/app/classes/jobs';
import { User } from 'src/app/classes/user';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit{


  @Output()
  jobAdded = new EventEmitter<boolean>()

  jobForm:FormGroup
  file:File

  constructor(private formBuilder:FormBuilder,
    private jobService:JobsService,
    private messageService:MessageService){}

  ngOnInit(): void {

    this.createForm()
  }

  createForm():void{
    this.jobForm = this.formBuilder.group({
      jobName: ['',[Validators.required]],
      jobPicture: ['',[Validators.required]]
    })
  }

  onChange(event:any):void {
      this.file = event.target.files[0]
  }

  onSubmit():void{
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    let user = new User()
    user.userId = JSON.parse(localStorage.getItem('user'))['userId']

    let job = new Jobs()
    job.jobName = this.jobForm.get('jobName').value
    job.user = user

    this.jobService.saveJob(job,this.file).subscribe({
     next:(_response:any)=>{
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Job Saved.' })
     },
     error:(_error:any)=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in saving Job.' })
     },
     complete:()=>{
      this.jobAdded.emit(true)
     }
    })

  }
}
