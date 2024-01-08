import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent {

  isSaved = false;
  
  vendorForm = new FormGroup({
    vendorCode: new FormControl({value: '', disabled: true}),
    vendorName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.pattern(/^(\+\d{1,3})?(\d{10}|\d{11})$/)),
    email: new FormControl('', Validators.email),
    address: new FormControl(''),
  })
  
}
