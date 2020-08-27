import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productFrom: FormGroup;
  @Output() products = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productFrom = this.fb.group({
      entries: this.fb.array([this.addEntry()])
    });

    this.productFrom.valueChanges.subscribe((changes: any) => {
      changes.entries.map( (data, i) => {
        data.total_price = Number(data.qty) * Number(data.unit_price);
      });
      this.products.emit(changes);
    });
  }

  addEntry(): FormGroup {
    return this.fb.group({
      product_id: ['', Validators.required],
      product_name: ['', Validators.required],
      qty: ['', Validators.required],
      unit_price: ['', Validators.required],
      total_price: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  addEntryBtnClick(): void {
    (this.productFrom.get('entries') as FormArray ).push(this.addEntry());
  }

  removeEntryBtnClick(index: number): void {
    (this.productFrom.get('entries') as FormArray ).removeAt(index);
  }

}
