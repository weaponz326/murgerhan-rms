import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent {

  isSaved = false;
  
  unitForm = new FormGroup({
    unitCode: new FormControl(''),
    unitName: new FormControl('', Validators.required),
    unitType: new FormControl(''),
    location: new FormControl(''),
    condition: new FormControl(''),
    description: new FormControl(''),
  })

}
