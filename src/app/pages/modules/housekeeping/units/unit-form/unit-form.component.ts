import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent {

  unitForm = new FormGroup({
    unitCode: new FormControl(''),
    unitName: new FormControl(''),
    unitType: new FormControl(''),
    location: new FormControl(''),
    condition: new FormControl(''),
    description: new FormControl(''),
  })

}
