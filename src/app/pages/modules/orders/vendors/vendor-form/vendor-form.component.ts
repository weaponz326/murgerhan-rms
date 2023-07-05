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
    vendorCode: new FormControl(''),
    vendorName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', Validators.email),
    address: new FormControl(''),
  })
  
}
