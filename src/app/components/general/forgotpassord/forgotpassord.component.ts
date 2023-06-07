import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgotpassord',
  templateUrl: './forgotpassord.component.html',
  styleUrls: ['./forgotpassord.component.css']
})
export class ForgotpassordComponent {
  passwordForm: FormGroup
  otpForm:FormGroup
  submitted = false;
  private otp:number
  received:boolean
  private email:string

  constructor(private formBuilder: FormBuilder,private userService:UserService,
    private messageService:MessageService,
    private router:Router) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      email: new FormControl ('', [Validators.required, Validators.email])
    });
    this.otpForm = this.formBuilder.group({
      otp: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required]),
    });
  }



  onSubmit() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }

    this.email = this.passwordForm.get('email').value
     this.otp = Math.floor(1000 + Math.random() * 9000);

     this.userService.resetPassword(this.email,this.otp).subscribe({
      next:(response:any)=>{

      },
      error:(error:any)=>{

      },
      complete:()=>{
        this.received = true
      }
     })

  }

  otpSubmit(){

    const value  = this.otpForm.get('otp').value
    const pass  = this.otpForm.get('password').value
    if(value !=this.otp){
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'OTP not Matched'
      })
      return
    }
    this.userService.changePassword(this.email,pass).subscribe({
      next:(response:any)=>{
        this.messageService.add({
          severity:'success',
          detail:'Password Changed',
          summary:'Changed'
        })
      },
      error:(error:any)=>{
        this.messageService.add({
          severity:'error'
        })
      },
      complete:()=>{
        this.router.navigate(['login'])
      }
    })
  }
}
