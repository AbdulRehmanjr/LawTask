import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  responsiveOptions: any[]

  freelancers: any[] = [
    { rating:5,
      job: 'Web Developer',
      name: 'Seller 1',
      image: 'assets/images/person/person1.jpg'
    },
    { rating:5,
      job: 'Web Developer',
      name: 'Seller 1',
      image: 'assets/images/person/person2.jpg'
    },
    { rating:5,
      job: 'Web Developer',
      name: 'Seller 1',
      image: 'assets/images/person/person3.jpg'
    },
    { rating:5,
      job: 'Web Developer',
      name: 'Seller 1',
      image: 'assets/images/person/person3.jpg'
    },
    { rating:5,
      job: 'Web Developer',
      name: 'Seller 1',
      image: 'assets/images/person/person3.jpg'
    },
    { rating:5,
      job: 'Web Developer',
      name: 'Seller 1',
      image: 'assets/images/person/person3.jpg'
    },
    { rating:5,
      job: 'Web Developer',
      name: 'Seller 1',
      image: 'assets/images/person/person3.jpg'
    },
    { rating:5,
      job: 'Web Developer',
      name: 'Seller 1',
      image: 'assets/images/person/person3.jpg'
    },
    { rating:5,
      job: 'Web Developer',
      name: 'Seller 1',
      image: 'assets/images/person/person3.jpg'
    },

  ]
  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
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
  }

  getTopFreelancers():void{

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
