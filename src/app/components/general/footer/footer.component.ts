import { Component, OnInit } from '@angular/core';
import { SocialLinks } from 'src/app/classes/sociallink';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  implements OnInit{

  socials:SocialLinks[]
  constructor(private socialService:SocialService){}
  ngOnInit(): void {
    this.fetchLinks()
  }



  fetchLinks(){
    this.socialService.getAllSocials().subscribe({
      next:(response:SocialLinks[])=>{
        this.socials = response
      },
      error:(_error)=>{

      },
      complete:()=>{

      }
    })
  }

}
