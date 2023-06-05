import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DashBoard } from 'src/app/classes/dashboard';
import { SellerJoin } from 'src/app/classes/sellerjoin';
import { UserJoin } from 'src/app/classes/userjoin';
import { DashboardService } from 'src/app/services/dashboard.service';
import { JoinService } from 'src/app/services/join.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: any = {}
  sellerData: any = {}
  admin: any
  info: DashBoard
  data: any
  sellerInfo:any
  userJoin: UserJoin[]
  sellerJoin: SellerJoin[]
  sellerOptions:any
  options: any


  constructor(private dashboard: DashboardService,
    private message: MessageService,
    private join: JoinService) { }

  ngOnInit(): void {

    this.admin = JSON.parse(localStorage.getItem('user'))
    this.fecthInfo()
    this.fetchUserJoin()
    this.fetchSellerJoin()

  }


  fecthInfo() {
    this.dashboard.getDashboardInfo().subscribe(
      {
        next: (response: DashBoard) => {
          this.info = response
          console.log("dashboard",response)
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

        this.userJoin.forEach((data: UserJoin) => {
          data.joinDate = data.joinDate.split("T")[0]
        })
        let object: any = {}

        this.userJoin.forEach((data) => {
          object[data['joinDate']] = (object[data['joinDate']] || 0) + 1
        })

        this.userData = object;

       this.graph()
      }

    })
  }

  fetchSellerJoin() {
    this.join.getSellerInfo().subscribe({
      next: (response: SellerJoin[]) => {
        this.sellerJoin = response
        this.message.add({
          severity:'success',
          summary:'Success'
        })
      },
      error: (error) => {
        this.message.add({
          severity:'error',
          summary:'Errror',
        })
      },
      complete: () => {
        this.sellerJoin.forEach((data: SellerJoin) => {
          data.joinDate = data.joinDate.split("T")[0]
        })
        let object: any = {}

        this.sellerJoin.forEach((data) => {
          object[data['joinDate']] = (object[data['joinDate']] || 0) + 1
        })

        this.sellerData = object;
           this.graphSeller()
      }
    })
  }

  graphSeller() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    console.log(this.sellerData)
    this.sellerInfo = {
      labels: Object.keys(this.sellerData),
      datasets: [
        {
          label: 'Seller',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: Object.values(this.sellerData)
        },
      ]
    };

    this.sellerOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
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
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    }
  }
  graph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    console.log(this.userData)
    this.data = {
      labels: Object.keys(this.userData),
      datasets: [
        {
          label: 'Users',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: Object.values(this.userData)
        },
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
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
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    }
  }
}
