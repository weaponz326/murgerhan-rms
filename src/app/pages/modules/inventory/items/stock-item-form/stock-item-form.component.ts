import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-stock-item-form',
  templateUrl: './stock-item-form.component.html',
  styleUrls: ['./stock-item-form.component.scss']
})
export class StockItemFormComponent {

  stockItemForm = new FormGroup({
    itemCode: new FormControl(),
    itemName: new FormControl(''),
    itemCategory: new FormControl(''),
    unitPrice: new FormControl(0.00),
    stock: new FormControl(0),
    refillOrdered: new FormControl(0),
    location: new FormControl(''),
    container: new FormControl(''),
    batchNumber: new FormControl(''),
    manufacturingDate: new FormControl(),
    expiryDate: new FormControl(),
  })

}
