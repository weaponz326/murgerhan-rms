import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-stock-item-form',
  templateUrl: './stock-item-form.component.html',
  styleUrls: ['./stock-item-form.component.scss']
})
export class StockItemFormComponent {

  @Output() openCategoryWindow = new EventEmitter<any>();

  isSaved = false;
  
  stockItemForm = new FormGroup({
    itemCode: new FormControl({value: '', disabled: true}),
    itemName: new FormControl('', Validators.required),
    itemCategory: new FormControl({value: '', disabled: true}, Validators.required),
    totalStock: new FormControl({value: 0, disabled: true}),
    refillOrdered: new FormControl(0),
    location: new FormControl(''),
  })

}
