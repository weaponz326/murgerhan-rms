import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent {

  supplierForm = new FormGroup({
    supplierCode: new FormControl(''),
    supplierName: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl(),
    address: new FormControl(''),
  })
  
}
