import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contractor-form',
  templateUrl: './contractor-form.component.html',
  styleUrls: ['./contractor-form.component.scss']
})
export class ContractorFormComponent {

  isSaved = false;
  
  contractorForm = new FormGroup({
    contractorCode: new FormControl({value: '', disabled: true}),
    contractorName: new FormControl('', Validators.required),
    contractorType: new FormControl(''),
    mainService: new FormControl(''),
    phone: new FormControl('', Validators.pattern(/^(\+\d{1,3})?(\d{10}|\d{11})$/)),
    email: new FormControl('', Validators.email),
    address: new FormControl(''),
  })
  
}
