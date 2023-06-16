import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/classes/user';
import { ChatlistService } from 'src/app/services/chatlist.service';
import { SingupService } from 'src/app/services/singup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  SignupForm: FormGroup
  file: File
  Error: string
  user:any
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _signup: SingupService,
    private messageService:MessageService,
    private chatList:ChatlistService) { }
  ngOnInit(): void {
    this.SignupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      profilePicture: ['', Validators.required],
    });
  }

  passwordMatchValidator(form: FormGroup): void {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  onChange(event: any) {
    this.file = event.target.files[0]
  }
  OnSubmit() {
    if (this.SignupForm.invalid) {
      this.SignupForm.markAllAsTouched();
      return;
    }
    let user = new User()
    user.email = this.SignupForm.controls['email'].value
    user.password = this.SignupForm.controls['password'].value
    user.userName = this.SignupForm.controls['username'].value

    this._signup.saveUser(user, this.file).subscribe({
      next: (value: any) => {
        if (value) {
          this.user = value
          this._router.navigate(['login'])
        }
      },
      error: (err: Error) => {

        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error!, Please check provided Information.` })
      },
      complete: () => {

        this.chatList.createNewChatList(this.user.userId).subscribe()
      }
    })
  }
}
