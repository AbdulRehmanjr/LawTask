import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  freelanceId: string = ''
  freelancerData: Freelancer = null
  first: number = 0
  rows: number = 2
  currentPage = 1
  jobs: Job[]
  constructor(private route: ActivatedRoute,
    private freelancerService: FreelancerService,
    private router: Router,
    private jobService: JobsService,
    private chatList:ChatlistService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.freelanceId = params['id'];
    });
    this.fetchFreelancer()

  }


  fetchFreelancer() {

    this.freelancerService.getFreelancerById(this.freelanceId).subscribe(
      {
        next: (response: Freelancer) => {
          this.freelancerData = response
        },
        error: (_error) => {
          this.router.navigate(['/not-found'])
        },
        complete: () => {
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
    const userId = JSON.parse(localStorage.getItem('user'))['userId']
    const receiverId = this.freelancerData?.seller?.user?.userId
    this.chatList.addNewUser(userId, receiverId).subscribe({
      next: (_response) => {
        console.log(_response)
      },
      error: (_error) => {
        console.log('error',_error)
      },
      complete: () => {
        this.router.navigate(['/home/messages'])
      }
    })

  }
}
