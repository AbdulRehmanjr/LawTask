import { Component } from '@angular/core';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {

  cards:any[]=[
    {
      icon:'fa-regular fa-file-word',
      counter:612,
      category:'Web & Software Dev',
      description:'Software Engineer, Web / Mobile Developer & More'
    },
    {
      icon:'fa-regular fa-chart-bar',
      counter:113,
      category:'Data Science & Analitycs',
      description:'Data Specialist / Scientist, Data Analyst & More'
    },
    {
      icon:'fa fa-file-invoice-dollar',
      counter:186,
      category:'Accounting & Consulting',
      description:'Auditor, Accountant, Fnancial Analyst & More'
    },
    {
      icon:'fa fa-pen',
      counter:145,
      category:'Writing & Translations',
      description:'Copywriter, Creative Writer, Translator & More'
    },
    {
      icon:'fa-regular fa-image',
      counter:567,
      category:'Graphics & Design',
      description:'Creative Director, Web Designer & More'
    },
    {
      icon:'fa fa-globe',
      counter:20,
      category:'Digital Marketing',
      description:'Darketing Analyst, Social Profile Admin & More'
    },

  ]
}
