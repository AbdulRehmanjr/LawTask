import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DashBoard } from 'src/app/classes/dashboard';
import { UserJoin } from 'src/app/classes/userjoin';
import { DashboardService } from 'src/app/services/dashboard.service';
import { JoinService } from 'src/app/services/join.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData :any = {}
  sellerData:any = {}
  admin: any
  info: DashBoard
  data: any;
  array: number[] = [1, 2, 3, 2, 4, 5, 6, 7, 1, 2, 3, 9, 0, 4, 5]
  userJoin: UserJoin[]

  options: any;

  constructor(private dashboard: DashboardService,
    private message: MessageService,
    private join: JoinService) { }

  ngOnInit(): void {

    this.admin = JSON.parse(localStorage.getItem('user'))
    this.fecthInfo()
    this.fetchUserJoin()

  }


  fecthInfo() {
    this.dashboard.getDashboardInfo().subscribe(
      {
        next: (response: DashBoard) => {
          this.info = response
        },
        error: (error: any) => {
          this.message.add({ severity: 'error', summary: 'Error', detail: 'Error in fecthing dashbaord info.' })
        },
        complete: () => {

        }
      }
    )
  }
  fetchUserJoin() {
    this.join.getUsersInfo().subscribe({
      next: (response: UserJoin[]) => {
        this.userJoin = response
      },
      error: (error: any) => {
        this.message.add({ severity: 'error', summary: 'Error', detail: 'Error in fecthing user join info.' })
      },
      complete: () => {

        this.userJoin.forEach((data:UserJoin) => {
          data.date = data.date.split("T")[0]
        })
        this.keyValue(this.userJoin)
        this.graph()
      }

    })
  }
  keyValue(data:UserJoin[]){
    let object:any = {}

   data.forEach((data)=>{
    object[data['date']] = (object[data['date']] || 0)+1
   })

   this.userData = object;

  }
  graph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    this.data = {
      labels: Object.keys(this.userData) ,
      datasets: [
        {
          label: 'Users',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y',
          tension: 0.4,
          data: Object.values(this.userData)
        },
        {
          label: 'Sellers',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          yAxisID: 'y1',
          tension: 0.4,
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder
          }
        }
      }
    };
  }
}
