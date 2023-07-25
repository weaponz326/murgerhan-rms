import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-factory-item-form',
  templateUrl: './factory-item-form.component.html',
  styleUrls: ['./factory-item-form.component.scss']
})
export class FactoryItemFormComponent {

  isSaved = false;

  factoryItemForm = new FormGroup({
    itemCode: new FormControl({value: '', disabled: true}),
    itemName: new FormControl('', Validators.required),
    itemType: new FormControl(''),
    price: new FormControl(0.00),
    description: new FormControl(''),
  })

}
