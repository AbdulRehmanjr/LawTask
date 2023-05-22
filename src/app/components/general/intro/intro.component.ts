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

  private location: string
  private category: string = ''
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

    this.location = this.searchForm.get('location').value

    if (typeof this.location == undefined) {
      this.location = 'ANY'
    }

    this.category = this.searchForm.get('category').value

    const queryParams = {
      category:this.category.trim(),
      location:this.location
    }

    this.router.navigate([`/home/search`],{queryParams})
  }
}
