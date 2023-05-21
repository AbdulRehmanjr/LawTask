import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Freelancer } from 'src/app/classes/freelancer';
import { ChatlistService } from 'src/app/services/chatlist.service';
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
    private router:Router){}
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
        console.log(response)
      },
      error:(error:any)=>{
        console.log("error")
      },
      complete:()=>{

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
