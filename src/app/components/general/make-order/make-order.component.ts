import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Job } from 'src/app/classes/job';
import { Order } from 'src/app/classes/order';
import { User } from 'src/app/classes/user';
import { JobsService } from 'src/app/services/jobs.service';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit{

  private sellerId :string = ''
  jobs:Job[]
  file:File

  order:FormGroup

  constructor(private route:ActivatedRoute,
    private jobService:JobsService,
    private form:FormBuilder,
    private router:Router,
    private orderService:OrderService,
    private messageService:MessageService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sellerId = params['sellerId'];
    });
    this.fetchJobs()
    this.createForm()
  }

  createForm(){
      this.order = this.form.group({
        userName: new FormControl('Filled by User',Validators.required),
        orderId : new FormControl('',Validators.required),
        startDate: new FormControl('',Validators.required),
        endDate : new FormControl('',Validators.required),
        email: new FormControl('Filled BY User',Validators.required),
        description: new FormControl('',Validators.required),
        requirement: new FormControl('Filled BY User',Validators.required),
        price :new FormControl(0,Validators.required)
      })
  }
  onChange(event: any) {
    this.file = event.target.files[0]
  }
  fetchJobs(){

    this.jobService.getJobsByUserId(this.sellerId).subscribe({
      next:(response:Job[])=>{
        this.jobs = response
      },
      error:(_error)=>{
        console.error(_error)
      },
      complete:()=>{

      }
    })
  }

  onSubmit(){

    let makeOrder = new Order()
    let job = new Job()
    let user = new User()

    makeOrder.customerName = this.order.get('userName').value
    makeOrder.customerEmail = this.order.get('email').value
    makeOrder.startedDate = this.order.get('startDate').value
    makeOrder.endedDate = this.order.get('endDate').value
    makeOrder.description = this.order.get('description').value
    makeOrder.price = this.order.get('price').value
    job.jobId =  this.order.get('orderId').value
    makeOrder.job = job
    user.userId = this.sellerId
    makeOrder.user = user


    console.log(makeOrder)
    this.orderService.createOrder(makeOrder).subscribe({
      next:(_response:any)=>{
        navigator.clipboard.writeText(_response).then(function() {
          console.log('Order URL copied to clipboard');
      }).catch(function(err) {
          console.error('Could not copy text: ', err);
      });
        this.messageService.add({severity:'success',summary:'Add Success',detail:'URL copied to clipboard'})

      },
      error:(_error:any)=>{
        console.log(_error)
        this.messageService.add({severity:'error',summary:'Error',detail:'Error Making Order'})
      },
      complete:()=>{
        this.router.navigate(['/home/messages'])
      }
    })
  }
}
