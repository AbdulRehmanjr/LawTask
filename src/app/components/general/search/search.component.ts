import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Job } from 'src/app/classes/job';
import { ChatlistService } from 'src/app/services/chatlist.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  first: number = 0
  rows: number = 5
  currentPage=1
  search: FormGroup
  jobs: Job[]
  jobName: string = ''
  isFound:boolean = false

  constructor(private jobService: JobsService,
    private message: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private chatList: ChatlistService) { }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.jobName = params['category'];
    });
    this.fetchJobs()
    this.createForm()
  }

  createForm(): void {
    this.search = this.formBuilder.group({
      job: new FormControl('')
    })
  }
  onPageChange(event:any) {
    this.first = event.first;
    this.rows = event.rows;
}
  moveArrow(direction: string) {
    if (direction === 'back' && this.currentPage > 1) {
      this.currentPage--
    } else if (direction === 'forward' && this.currentPage < this.jobs.length) {
      this.currentPage++
    }
  }
  fetchJobs(): void {
    this.jobService.getJobsByJobName(this.jobName).subscribe({
      next: (response: Job[]) => {
        this.jobs = response
      },
      error: (error: any) => {
        this.message.add({ severity: 'error', summary: 'error', detail: 'No Job or service found.' })
      },
      complete: () => {
        this.isFound = true
      }
    })
  }
  sendMessage(receiverId: string) {
    const userId = JSON.parse(localStorage.getItem('user'))['userId']

    this.chatList.addNewUser(userId, receiverId).subscribe({
      next: (_response) => {

      },
      error: (_error) => {
        console.log(_error)
        // this.router.navigate(['/home/messages'])
      },
      complete: () => {
        this.router.navigate(['/home/messages'])
      }
    })

  }
  onSubmit(): void {

    const job = this.search.get('job').value

    this.jobService.getJobsByJobName(job).subscribe({
      next: (response: Job[]) => {
        this.jobs = response
      },
      error: (error: any) => {
        this.isFound = false
        this.message.add({ severity: 'error', summary: 'error', detail: 'No Job or service found.' })
      },
      complete: () => {
      }
    })
  }
}
