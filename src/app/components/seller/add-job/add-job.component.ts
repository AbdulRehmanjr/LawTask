import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Job } from 'src/app/classes/job';
import { User } from 'src/app/classes/user';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {


  @Output()
  jobAdded = new EventEmitter<boolean>()

  jobForm: FormGroup
  file: File
  stateOptions: any[] = [
    { label: 'Fixed', value: 'Fixed' },
    { label: 'Hourly', value: 'Hourly' }
  ];
  constructor(private formBuilder: FormBuilder,
    private jobService: JobsService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.createForm()
  }

  createForm(): void {
    this.jobForm = this.formBuilder.group({
      jobName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      jobType:  new FormControl('Fixed'),
      jobPicture: ['', [Validators.required]],
      jobPrice: ['', Validators.required]
    })
  }

  onChange(event: any): void {
    this.file = event.target.files[0]
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    let user = new User()
    user.userId = JSON.parse(localStorage.getItem('user'))['userId']

    let job = new Job()
    job.jobName = this.jobForm.get('jobName').value
    job.description = this.jobForm.get('description').value
    job.jobPrice = this.jobForm.get('jobPrice').value
    job.jobType = this.jobForm.get('jobType').value
    job.user = user

    this.jobService.saveJob(job, this.file).subscribe({
      next: (_response: any) => {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Job Saved.' })
      },
      error: (_error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in saving Job.' })
      },
      complete: () => {
        this.jobAdded.emit(true)
      }
    })

  }
}
