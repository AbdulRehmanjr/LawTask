import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SellerRequest } from 'src/app/classes/seller-request';
import { SellerrequestService } from 'src/app/services/sellerrequest.service';

@Component({
  selector: 'app-approved-requests',
  templateUrl: './approved-requests.component.html',
  styleUrls: ['./approved-requests.component.css']
})
export class ApprovedRequestsComponent {


  sellerRequests: SellerRequest[] = []


  constructor(
    private messageService: MessageService,
    private sellerService: SellerrequestService,
  ) {

  }

  ngOnInit(): void {
    this.fetchAllRequests()
  }

  fetchAllRequests(): void {
    this.sellerService.getApprovedRequests().subscribe({
      next: (response: SellerRequest[]) => {

        this.sellerRequests = response
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Network error.' })
      },
      complete: () => {

      }
    })
  }


}
