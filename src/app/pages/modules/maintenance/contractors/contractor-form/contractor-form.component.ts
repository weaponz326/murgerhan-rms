import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contractor-form',
  templateUrl: './contractor-form.component.html',
  styleUrls: ['./contractor-form.component.scss']
})
export class ContractorFormComponent {

  contractorForm = new FormGroup({
    contractorCode: new FormControl(''),
    contractorName: new FormControl('', Validators.required),
    contractorType: new FormControl(''),
    mainService: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
  })
  
}
