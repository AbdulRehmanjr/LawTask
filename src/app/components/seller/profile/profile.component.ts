import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Freelancer } from 'src/app/classes/freelancer';
import { Job } from 'src/app/classes/job';
import { ChatlistService } from 'src/app/services/chatlist.service';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string = ''
  freelancerData: Freelancer = null
  first: number = 0
  rows: number = 2
  currentPage = 1
  jobs: Job[]

  constructor(private route: ActivatedRoute,
    private freelancerService: FreelancerService,
    private router: Router,
    private messageService: MessageService,
    private jobService: JobsService,
    private chatList: ChatlistService,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')
    this.fetchFreelancer()

  }


  fetchFreelancer() {

    this.freelancerService.getFreelancerByUserId(this.userId).subscribe(
      {
        next: (response: Freelancer) => {
          this.freelancerData = response
        },
        error: (_error) => {
          this.router.navigate(['/not-found'])
        },
        complete: () => {
            let flagInfo:any
                  this.http.get(` https://restcountries.com/v3.1/name/${this.freelancerData?.seller.location}`)
                .subscribe({
                  next:(response:any)=>{
                    flagInfo =  response
                  },
                  error:()=>{

                  },
                  complete:()=>{
                    this.freelancerData.flag = flagInfo[0].flags['svg']
                  }
                })

          this.fetchJobs()
        }
      }
    )
  }
  fetchJobs(): void {
    this.jobService.getJobsByUserId(this.freelancerData?.seller?.user?.userId).subscribe({
      next: (response: Job[]) => {
        this.jobs = response
      },
      error: (_error: any) => {
        // this.router.navigate(['/not-found'])
      },
      complete: () => {

      }
    })
  }
  onPageChange(event: any) {
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
  sendMessage() {

    try {
      const userId = JSON.parse(localStorage.getItem('user'))['userId']
      const receiverId = this.freelancerData?.seller?.user?.userId
      this.chatList.addNewUser(userId, receiverId).subscribe({
        next: (_response) => {
          console.log(_response)
        },
        error: (_error) => {
          console.log('error', _error)
        },
        complete: () => {
          this.router.navigate(['/home/messages'])
        }
      })
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login!!',
        detail: 'Please Login First'
      })
    }




    }


}
