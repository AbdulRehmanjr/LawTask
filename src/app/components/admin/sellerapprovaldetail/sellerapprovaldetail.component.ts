import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerRequest } from 'src/app/classes/seller-request';

import * as fileSave from 'file-saver'
import { SellerrequestService } from 'src/app/services/sellerrequest.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sellerapprovaldetail',
  templateUrl: './sellerapprovaldetail.component.html',
  styleUrls: ['./sellerapprovaldetail.component.css']
})
export class SellerapprovaldetailComponent implements OnInit {

  rate: number = 10
  sellerForm: FormGroup
  disableSkills: boolean = false
  selectedSkills: string[] = []
  sellerId: string = ''
  seller: SellerRequest
  isDisplay:boolean=false
  userImage:string = ''
  remarksForm:FormGroup
  status:boolean = false
  isReject:boolean = false
  constructor(private activeRoute: ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder,
    private sellerService: SellerrequestService,
    private userService:UserService,
    private message:MessageService) {

  }
  ngOnInit(): void {

    this.sellerId = this.activeRoute.snapshot.paramMap.get('sellerId')
    this.remarksForm = this.formBuilder.group({
      remark: ['', [Validators.required]],
    });
    this.fetchSellerDetail()
  }


  /**
   * @function GET Single userId
   * @since v1.0.0
   * @required sellerId
   */
  fetchSellerDetail() {
    this.sellerService.getSellserBySellerId(this.sellerId).subscribe({

      next: (response: SellerRequest) => {
        this.seller = response
        if(response.active == true){
          this.status = true
        }
        if(response.rejected == true){
          this.isReject = true
        }
      },
      error: (_err) => {
        console.log('error in fetching')
      },
      complete: () => {
        this.userService.getUserById(this.seller.user.userId).subscribe({
          next:(response:User)=>{
              this.userImage = response.profilePicture
          },
          error:(_error:any)=>{
            console.log('Error show')
          },
          complete:()=>{

          }
        })
      }

    })


  }

  download(): void {

    const byteCharacters = atob(this.seller.document);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: `${this.seller.documentType}` })

    fileSave.saveAs(file, `${this.seller.firstName}.${this.seller.documentType.split('/')[1]}`)
  }

  showDialog():void{
    this.isDisplay = true
  }

  accept():void{
    this.sellerService.acceptRequestBySellerId(this.sellerId).subscribe(
      {
        next:(_respone:any)=>{
          this.message.add({severity:'success',summary:'Approved',detail:'Saved'})
        },
        error:(_error:any)=>{
          this.message.add({severity:'error',summary:'Error!!!',detail:'Approved saving error'})
        },
        complete:()=>{
          console.log('request updated success')
          this.router.navigate(['/admin-dashboard/request-approval'])
        }
      }
    )
  }
  reject(){
    this.isDisplay = false
    const remarks = this.remarksForm.get('remark').value
    this.sellerService.rejectRequestBySellerId(this.sellerId,remarks).subscribe({
      next:(_respone:any)=>{
        this.message.add({severity:'success',summary:'Remark Given',detail:'Saved'})
      },
      error:(_error:any)=>{
        this.message.add({severity:'error',summary:'Error!!!',detail:'Remark saving error'})
      },
      complete:()=>{
        this.ngOnInit()
      }
    })
  }
}

