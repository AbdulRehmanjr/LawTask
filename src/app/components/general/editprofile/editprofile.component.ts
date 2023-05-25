import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/classes/role';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  editProfile:FormGroup
  private userId:string
   user:User
  placeholder:any
  private file:File
  constructor(private fb:FormBuilder,private userService:UserService){

  }
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user'))['userId']
    this.fetchUser()
    this.createForm()
  }

  createForm(){
    this.editProfile = this.fb.group({
      email: new FormControl({value:'',disabled:true}, [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),

    })
  }
  fetchUser(){
    this.userService.getUserByIdEdit(this.userId).subscribe({
      next:(response:any)=>{

        this.user = response
      },
      error:(error:any)=>{

      },
      complete:()=>{
        this.editProfile.patchValue({
          username:this.user?.userName,
          email:this.user?.email,

        });
      }
    })
  }
  onChange(event:any){
    this.file = event.target.files[0]
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.placeholder = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
  }

  onSubmit(){

    this.user.userName = this.editProfile.get('username').value
    let role = new Role()
    role.roleId = this.user?.role.roleId
    role.roleName = this.user?.role.roleName
    this.user.role = role
    this.userService.updateUser(this.user,this.file).subscribe({
      next:(response:any)=>{
        this.ngOnInit()
      },
      error:(error:any)=>{

      },
      complete:()=>{

      }
    })
  }
}