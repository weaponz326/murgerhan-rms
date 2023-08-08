import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-branch-order-item-form',
  templateUrl: './branch-order-item-form.component.html',
  styleUrls: ['./branch-order-item-form.component.scss']
})
export class BranchOrderItemFormComponent {

  @Output() openProductWindow = new EventEmitter<any>();
  
  isSaved = false;
  
  orderItemForm = new FormGroup({
    itemCode: new FormControl({value: '', disabled: true}),
    itemName: new FormControl({value: '', disabled: true}, Validators.required),
    price: new FormControl({value: 0.00, disabled: true}),
    quantity: new FormControl(1),
  })
  
}
