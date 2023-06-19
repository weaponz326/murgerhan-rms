import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent {

  vendorForm = new FormGroup({
    vendorCode: new FormControl(''),
    vendorName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(),
    address: new FormControl(''),
  })
  
}
