import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Coupon } from 'src/app/classes/coupon';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit{

  coupons:Coupon[]
  displayDialog:boolean = false
  couponForm: FormGroup;

  constructor(private fb: FormBuilder,
    private couponService:CouponService,
    private messageService:MessageService) { }

  ngOnInit() {
    this.couponForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      amount: ['', [Validators.required, Validators.min(5)]]
    });
    this.fetchAllCoupon()
  }

  get f() { return this.couponForm.controls; }

  fetchAllCoupon(){
      this.couponService.getAllCoupons().subscribe({
        next:(response:Coupon[])=>{
          this.coupons = response
          this.messageService.add({severity:'success',summary:'Feched!!!',detail:'Coupon Fetched Successfully'})
        },error:()=>{
          this.messageService.add({severity:'error',summary:'Error',detail:'Coupon Fetching Error '})
        },complete:()=>{

        }
      })
    }

  onSubmit() {

    let coupon = new Coupon()

    coupon.name = this.couponForm.get('name').value
    coupon.discount = this.couponForm.get('amount').value

    this.displayDialog = false
    this.couponService.saveCoupon(coupon).subscribe({
      next:(response:Coupon)=>{
        this.messageService.add({severity:'success',summary:'Saved',detail:'Coupon Saved Successfully'})
      },error:()=>{
        this.messageService.add({severity:'error',summary:'Error',detail:'Coupon Saving Error '})
      },complete:()=>{

        this.fetchAllCoupon()

      }
    })
  }
  deleteCoupon(id:string){

    console.log('clicked')
    this.couponService.deleteCoupon(id).subscribe({
      next:()=>{

        this.messageService.add({severity:'success',summary:'Deleted!!!',detail:'Coupon Deleted Successfully'})
      },error:()=>{
        this.messageService.add({severity:'error',summary:'Error',detail:'Coupon Deleting Error '})
      },complete:()=>{
        this.fetchAllCoupon()
      }
    })
  }
  showDialog(){
    this.displayDialog = true
  }


}
