import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { Freelancer } from 'src/app/classes/freelancer';
import { CategoryService } from 'src/app/services/category.service';
import { FreelancerService } from 'src/app/services/freelancer.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  responsiveOptions: any[]
  categories:Category[]
  freelancers: Freelancer[] = []

  constructor(private freelancerService:FreelancerService,
    private router:Router,private http:HttpClient,
    private categoryService:CategoryService){

    }
  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.getTopFreelancers()
    this.fetchCategories()
  }

  search(value:number){
    const queryParams = {
      jobName:value,
    }
    this.router.navigate([`/home/search`],{queryParams})
  }

  fetchCategories():void{
      this.categoryService.getAllCategories().subscribe({
        next: (response: Category[]) => {
          this.categories = response
        },
        error: (error: any) => {

        },
        complete: () => {
           this.categories = this.categories.sort((a,b)=>  b.jobCount - a.jobCount)
        }
      })
  }
  getTopFreelancers():void{
    this.freelancerService.getTopFreeLancers().subscribe({
      next:(response:Freelancer[])=>{
        this.freelancers  = response
      },
      error:(error:any)=>{

      },
      complete:()=>{
        let flagInfo:any
        this.freelancers.map(
          data=>{
              this.http.get(` https://restcountries.com/v3.1/name/${data.seller.location}`)
            .subscribe({
              next:(response:any)=>{

                flagInfo =  response

              },
              error:()=>{

              },
              complete:()=>{
                data.flag = flagInfo[0].flags['svg']

              }
            })
          }
        )
      }
    })
  }

  freelancerProfile(id:string){
    const queryParams = {
      id:id

    }

    this.router.navigate([`/home/profile`],{queryParams})
  }

}
