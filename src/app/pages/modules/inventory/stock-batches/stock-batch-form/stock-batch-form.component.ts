import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-batch-form',
  templateUrl: './stock-batch-form.component.html',
  styleUrls: ['./stock-batch-form.component.scss']
})
export class StockBatchFormComponent {

  @Output() openStockItemWindow = new EventEmitter<any>();

  isSaved = false;
  
  stockBatchForm = new FormGroup({
    batchCode: new FormControl({value: '', disabled: true}),
    itemCode: new FormControl({value: '', disabled: true}),
    itemName: new FormControl({value: '', disabled: true}, Validators.required),
    itemCategory: new FormControl({value: '', disabled: true}, Validators.required),
    unitPrice: new FormControl(0.00),
    stock: new FormControl(0),
    location: new FormControl(''),
    container: new FormControl(''),
    batchNumber: new FormControl(''),
    manufacturingDate: new FormControl(),
    expiryDate: new FormControl(),
  })
  
}
