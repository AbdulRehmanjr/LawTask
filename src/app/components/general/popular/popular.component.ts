import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancer } from 'src/app/classes/freelancer';
import { FreelancerService } from 'src/app/services/freelancer.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  responsiveOptions: any[]

  freelancers: Freelancer[] = []

  constructor(private freelancerService:FreelancerService,
    private router:Router,private http:HttpClient){

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
  }

  getTopFreelancers():void{
    this.freelancerService.getTopFreeLancers().subscribe({
      next:(response:Freelancer[])=>{
        this.freelancers  = response
      },
      error:(error:any)=>{
        console.log("error")
      },
      complete:()=>{
        let flagInfo:any
        this.freelancers.map(
          data=>{
              this.http.get(` https://restcountries.com/v3.1/name/${data.seller.location}`)
            .subscribe({
              next:(response:any)=>{
                console.log(response)
                flagInfo =  response

              },
              error:()=>{

              },
              complete:()=>{
                data.flag = flagInfo[0].flags['svg']
                console.log(data.flag)
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
  cards: any[] = [
    {
      icon: 'fa-regular fa-file-word',

      category: 'Web & Software Dev',
      description: 'Software Engineer, Web / Mobile Developer & More'
    },
    {
      icon: 'fa-regular fa-chart-bar',

      category: 'Data Science & Analitycs',
      description: 'Data Specialist / Scientist, Data Analyst & More'
    },
    {
      icon: 'fa fa-file-invoice-dollar',

      category: 'Accounting & Consulting',
      description: 'Auditor, Accountant, Fnancial Analyst & More'
    },
    {
      icon: 'fa fa-pen',
      counter: 145,
      category: 'Writing & Translations',
      description: 'Copywriter, Creative Writer, Translator & More'
    },
    {
      icon: 'fa-regular fa-image',

      category: 'Graphics & Design',
      description: 'Creative Director, Web Designer & More'
    },
    {
      icon: 'fa fa-globe',

      category: 'Digital Marketing',
      description: 'Darketing Analyst, Social Profile Admin & More'
    },

  ]


}
