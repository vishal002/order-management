import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;
  @Input() typeOfAddress;
  @Output() billingAddress = new EventEmitter();
  @Output() shippingAddress = new EventEmitter();
  constructor(private fb: FormBuilder,
              private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      zipcode: [''],
      country: [''],
      orderDate: [''],
      expectedDeliveryDate: ['']
    });

    this.getAddress();

    this.addressForm.valueChanges.subscribe(changes => {
      if (this.typeOfAddress === 'billing' ) {
        delete changes.expectedDeliveryDate;
        this.billingAddress.emit(changes);
      } else {
        delete changes.orderDate;
        this.shippingAddress.emit(changes);
      }
    });
  }

  getAddress() {
    this.dashboardService.getAddress()
      .subscribe( (response: any) => {
        debugger;
      }, error => {
        console.log('some error occured while fetching address: ', error);
      });
  }

}
