import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DashBoard } from 'src/app/classes/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  searchForm: FormGroup
  info:DashBoard
  private jobName: string = ''
  constructor(private form: FormBuilder,private router:Router,
    private dashboard:DashboardService,
    private message:MessageService) { }
  ngOnInit(): void {

    this.createForm()
    this.fetchInfo()
  }

  createForm(): void {
    this.searchForm = this.form.group({
      location: [''],
      category: ['', [Validators.required]]
    })

  }
  fetchInfo(){
    this.dashboard.getDashboardInfo().subscribe(
      {
        next: (response: DashBoard) => {
          this.info = response
        },
        error: (error: any) => {
          this.message.add({ severity: 'error', summary: 'Error', detail: 'Error in fecthing dashbaord info.' })
        },
        complete: () => {

        }
      }
    )
  }
  onSubmit(): void {

    if (this.searchForm.invalid) {
      return
    }


    this.jobName = this.searchForm.get('category').value

    const queryParams = {
      jobName:this.jobName.trim(),
    }

    this.router.navigate([`/home/search`],{queryParams})
  }
}
