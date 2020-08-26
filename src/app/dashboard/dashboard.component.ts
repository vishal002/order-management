import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataToSave: any;
  isBtnDisabled: boolean;
  constructor() {
    this.dataToSave = {address: [{billing: '', shipping: ''}], product: ''};
  }

  ngOnInit(): void {
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

}
