import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  searchForm: FormGroup

  private location: string
  private category: string = ''
  constructor(private form: FormBuilder,private router:Router) { }
  ngOnInit(): void {

    this.createForm()
  }

  createForm(): void {
    this.searchForm = this.form.group({
      location: [''],
      category: ['', [Validators.required]]
    })
  }

  onSubmit(): void {

    if (this.searchForm.invalid) {
      return
    }

    this.location = this.searchForm.get('location').value

    if (typeof this.location == undefined) {
      this.location = 'ANY'
    }

    this.category = this.searchForm.get('category').value

    const queryParams = {
      category:this.category.trim(),
      location:this.location
    }
    console.log(`${this.category},${this.location}`)
    this.router.navigate([`/home/search`],{queryParams})
  }
}
