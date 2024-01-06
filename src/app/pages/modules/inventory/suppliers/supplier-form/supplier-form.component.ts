import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent {

  isSaved = false;
  
  supplierForm = new FormGroup({
    supplierCode: new FormControl({value: '', disabled: true}),
    supplierName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.pattern(/^(\+\d{1,3})?(\d{10})$/)),
    email: new FormControl('', Validators.email),
    address: new FormControl(''),
  })
  
}
