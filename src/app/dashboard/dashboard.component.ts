import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataToSave: any;
  billingAddressInfo: any;
  shippingAddressInfo: any;
  constructor(private dashboardService: DashboardService) {
    this.dataToSave = {address: [{billing: '', shipping: ''}], product: ''};
  }

  ngOnInit(): void {
    this.getAddress();
  }

  getBillingAddress(event) {
    const address = event;
    this.dataToSave.address[0].billing = address;
  }

  getShippingAddress(event) {
    const address = event;
    this.dataToSave.address[0].shipping = address;
  }

  getProducts(event) {
    const product = event && event.entries;
    this.dataToSave.product = product;
  }

  savebtn() {
    console.dir(this.dataToSave);
  }

  getAddress() {
    this.dashboardService.getAddress()
      .subscribe( (response: any) => {
        this.billingAddressInfo = response.billing;
        this.shippingAddressInfo = response.shipping;
      }, error => {
        console.log('some error occured while fetching address: ', error);
      });
  }

}
