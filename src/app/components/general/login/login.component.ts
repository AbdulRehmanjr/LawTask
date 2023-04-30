import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';



import { Login } from 'src/app/classes/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loggedIn: boolean;
  LoginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private messageService:MessageService
  ) { }

  //  CurrentUser:any;


  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }


  // form submission
  OnSubmit() {


    if (this.LoginForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Provide Credentials' })
      return
    }

    let login = new Login();

    login.userEmail = this.LoginForm.controls['email'].value;
    login.password = this.LoginForm.controls['password'].value;


    this.loginService.generateToken(login).subscribe({
      next: (data: any) => {
        console.log('token', data.token)
        this.loginService.setToken(data.token)

        this.loginService.currentUser(login).subscribe(
          {
            next: (data: any) => {
              this.loginService.setUser(data)
            }
            , error(err:Error) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Network Error' })
            },
            complete: () => {

              this.redirection()
            },
          }

        )
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Network Error' })

      },
      complete: () => {
        console.log(`completted token generation`)
      }
    })
  }

  private redirection(): void {

    const role = this.loginService.getAuthority()

    if (role == "ADMIN") {

      this.router.navigate([''])

    } else if (role == "USER") {
      this.router.navigate([''])
    }
    else if(role=='SELLER'){
      this.router.navigate([''])
    }
    else {
      this.router.navigate(['login'])
    }
  }
}
