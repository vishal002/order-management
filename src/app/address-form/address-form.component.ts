import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit, OnChanges {
  addressForm: FormGroup;
  @Input() typeOfAddress;
  @Input() addressInfo;
  @Output() billingAddress = new EventEmitter();
  @Output() shippingAddress = new EventEmitter();
  constructor(private fb: FormBuilder,
              private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required],
      orderDate: ['', Validators.required],
      expectedDeliveryDate: ['', Validators.required]
    });

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.addressInfo.currentValue) {
      this.addressForm.patchValue(this.addressInfo);
    }
  }
}
