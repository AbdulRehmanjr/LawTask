import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SellerRequest } from 'src/app/classes/seller-request';
import { User } from 'src/app/classes/user';
import { SellerrequestService } from 'src/app/services/sellerrequest.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-request-seller',
  templateUrl: './request-seller.component.html',
  styleUrls: ['./request-seller.component.css']
})
export class RequestSellerComponent {

  userId: string = ''
  user: User
  role: string = ''
  isAccepted: boolean = false
  isRejected: boolean = false
  alreadyRequested: boolean = false
  rate: number = 10
  sellerForm: FormGroup
  updateForm: FormGroup
  isDisabled: boolean = true
  remark :string = ''
  display:boolean = false
  profilPicture: File
  document: File
  request:SellerRequest

  constructor(private messageService: MessageService,
    private sellerService: SellerrequestService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

    this.userId = JSON.parse(localStorage.getItem('user'))['userId']
    this.creatingForm()
    this.checkSellerRequest()

    this.fetchUser()

  }


  fetchUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (response: User) => {
        this.user = response
      },
      error: (_error) => {
        console.error(_error)
      },
      complete: () => {

      }

    })
  }

  /**
   * @function (check) will check weither the user has already made a request or not.
   */
  checkSellerRequest() {
    this.sellerService.getSellerByUserId(this.userId).subscribe(
      {
        next: (response: SellerRequest) => {
          this.request = response
          if(response){
            this.alreadyRequested = true
          }
          if (response.rejected == true) {
            this.isRejected = true
            this.remark = response.remarks
          }

          if (response.active === true) {
            this.isAccepted = true
          }


        },
        error: (_error: any) => {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Welcome to Seller Page.' })
        },
        complete: () => {

        }
      }
    )
  }
  /**
   * @form creating form without files
   * @since v1.0.0
   */
  creatingForm(): void {
    this.sellerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      jobName: new FormControl('', [Validators.required]),
      tagLine: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.updateForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      jobName: new FormControl('', [Validators.required]),
      tagLine: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

  }


  /**
   * @function selected skills
   */
  documentUpload(event: any): void {
    this.document = event.target.files[0]
  }
  removeAttachement() {
    this.document = null;
  }



  /**
   * @action Form submission handling
   * @since v1.0.0
   */
  onSubmit(): void {

    if (this.sellerForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Provide Credentials' })
      return
    }

    let seller = new SellerRequest()

    const user = new User()

    user.userId = this.user['userId']

    seller.user = user
    seller.firstName = this.sellerForm.get('firstName').value
    seller.lastName = this.sellerForm.get('lastName').value
    seller.email = this.user['email']
    seller.jobName = this.sellerForm.get('jobName').value
    seller.description = this.sellerForm.get('description').value
    seller.tagLine = this.sellerForm.get('tagLine').value
    seller.location = this.sellerForm.get('location').value

    this.sellerService.requestSeller(seller, this.document).subscribe({
      next: (message: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` })
      },
      error: (error: Error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}` })
      }
      , complete: () => {
        this.ngOnInit()
      }
    })
  }

  showDialog(){
    this.updateForm.setValue({
      firstName: this.request.firstName,
      lastName: this.request.lastName,
      jobName: this.request.jobName,
      tagLine: this.request.tagLine,
      location: this.request.location,
      description: this.request.description,
    });
    this.display = true
  }
   /**
   * @action Form submission handling
   * @since v1.0.0
   */
   updateRequest(): void {


    if (this.updateForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Provide Credentials' })
      return
    }

    let seller = new SellerRequest()

    const user = new User()

    user.userId = this.user['userId']

    seller.sellerId = this.request.sellerId
    seller.user = user
    seller.firstName = this.updateForm.get('firstName').value
    seller.lastName = this.updateForm.get('lastName').value
    seller.email = this.user['email']
    seller.jobName = this.updateForm.get('jobName').value
    seller.description = this.updateForm.get('description').value
    seller.tagLine = this.updateForm.get('tagLine').value
    seller.location = this.updateForm.get('location').value

    this.display = false
    this.sellerService.updateRequestSeller(seller, this.document).subscribe({
      next: (message: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` })
      },
      error: (error: Error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}` })
      }
      , complete: () => {
        this.ngOnInit()
      }
    })

  }
   locations:any[]= [
    { name: "Alabama" },
    { name: "Alaska" },
    { name: "American Samoa" },
    { name: "Arizona" },
    { name: "Arkansas" },
    { name: "California" },
    { name: "Colorado" },
    { name: "Connecticut" },
    { name: "Delaware" },
    { name: "District of Columbia" },
    { name: "Florida" },
    { name: "Georgia" },
    { name: "Guam" },
    { name: "Hawaii" },
    { name: "Idaho" },
    { name: "Illinois" },
    { name: "Indiana" },
    { name: "Iowa" },
    { name: "Kansas" },
    { name: "Kentucky" },
    { name: "Louisiana" },
    { name: "Maine" },
    { name: "Maryland" },
    { name: "Massachusetts" },
    { name: "Michigan" },
    { name: "Minnesota" },
    { name: "Mississippi" },
    { name: "Missouri" },
    { name: "Montana" },
    { name: "Nebraska" },
    { name: "Nevada" },
    { name: "New Hampshire" },
    { name: "New Jersey" },
    { name: "New Mexico" },
    { name: "New York" },
    { name: "North Carolina" },
    { name: "North Dakota" },
    { name: "Northern Mariana Islands" },
    { name: "Ohio" },
    { name: "Oklahoma" },
    { name: "Oregon" },
    { name: "Pennsylvania" },
    { name: "Puerto Rico" },
    { name: "Rhode Island" },
    { name: "South Carolina" },
    { name: "South Dakota" },
    { name: "Tennessee" },
    { name: "Texas" },
    { name: "U.S. Virgin Islands" },
    { name: "Utah" },
    { name: "Vermont" },
    { name: "Virginia" },
    { name: "Washington" },
    { name: "West Virginia" },
    { name: "Wisconsin" },
    { name: "Wyoming" }
  ]

}
