import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/classes/category';
import { Job } from 'src/app/classes/job';
import { CategoryService } from 'src/app/services/category.service';
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
  currentPage = 1
  search: FormGroup
  jobs: Job[]
  jobName: string = ''
  isFound: boolean
  categories: Category[]
  filteredJobs: Job[]

  constructor(private jobService: JobsService,
    private message: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private chatList: ChatlistService) { }
  ngOnInit(): void {

    this.fetchCategories()
    this.route.queryParams.subscribe(params => {
      this.jobName = params['jobName'];

      if (this.jobName == undefined) {
        this.fetchAllJobs()
      }else{
        const id = +this.jobName

        if(Number.isNaN(id)){
          this.searchJobs(this.jobName)
        }else{
          this.fetchByCategory(id)
        }
      }
    });


    this.createForm()
  }

  createForm(): void {
    this.search = this.formBuilder.group({
      job: new FormControl('')
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

  fetchCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: Category[]) => {
        this.categories = response
      },
      error: (error: any) => {

      },
      complete: () => {

      }
    })
  }
  fetchJobs(): void {
    this.isFound = false
    this.jobService.getAlljobs(this.jobName).subscribe({
      next: (response: any[]) => {
        this.isFound = true
        this.jobs = [...response[0], ...response[1]]
      }
      ,
      error: (error: any) => {
        this.jobs = undefined
        this.isFound = false
      },
      complete: () => {
        this.filteredJobs = this.jobs

      }
    })


  }
  sendMessage(receiverId: string) {
    const userId = JSON.parse(localStorage.getItem('user'))['userId']

    this.chatList.addNewUser(userId, receiverId).subscribe({
      next: (_response) => {

      },
      error: (_error) => {

        // this.router.navigate(['/home/messages'])
      },
      complete: () => {
        this.router.navigate(['/home/messages'])
      }
    })

  }
  onSubmit(): void {

    const job = this.search.get('job').value

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { jobName: job.trim() },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    }).then(() => {
      this.fetchJobs();
    })
  }

  fetchAllJobs() {
    this.jobService.getAll().subscribe({
      next: (response: Job[]) => {
        this.isFound = true
        this.jobs = response
      },
      error: (error: any) => {
         this.jobs = undefined
         this.isFound = false
       },
      complete: () => {
        this.filteredJobs = this.jobs

      }
    })
  }
  searchJobs(keyword: string) {
    this.jobName = keyword
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { jobName: keyword.trim() },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    }).then(() => {
      this.jobService.getAlljobs(keyword).subscribe({
        next: (response: any[]) => {
          this.isFound = true
          this.jobs = [...response[0], ...response[1]]
        }
        ,
        error: (error: any) => {
          this.jobs = undefined
          this.isFound = false
        },
        complete: () => {
          this.filteredJobs = this.jobs

        }
      })
    })

  }
  fetchByCategory(value: number) {
    this.jobService.getAllJobsByCategory(value).subscribe({
      next: (response: Job[]) => {
        this.jobs = response
        this.isFound = true
      },
      error: (error: any) => {
        this.jobs = undefined
        this.isFound = false
      },
      complete: () => {
        this.filteredJobs = this.jobs

        return;
      }
    })
  }
  filterCategories(category: number) {
    if (this.filteredJobs == undefined) {
      this.fetchByCategory(category)
    }
    if (category) {
      this.jobs = this.filteredJobs.filter(job => job.category?.id == category)
      if(this.jobs.length ==0){
        this.jobService.getAllJobsByCategory(category).subscribe({
          next: (response: Job[]) => {
            this.jobs = response
            this.isFound = true
          },
          error: (error: any) => {
            this.jobs = undefined
            this.isFound = false
          },
          complete: () => {
            this.filteredJobs = this.jobs
            return;
          }
        })
      }
    }
    else {
      this.jobs = this.filteredJobs

    }
  }
}

