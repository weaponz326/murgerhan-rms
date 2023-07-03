import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrls: ['./personnel-form.component.scss']
})
export class PersonnelFormComponent {

  @Output() openUserRoleWindow = new EventEmitter<any>();
  @Output() openBatchWindow = new EventEmitter<any>();

  isSaved = false;

  personnelForm = new FormGroup({
    staffCode: new FormControl({value: '', disabled: true}),
    fullName: new FormControl({value: '', disabled: true}, Validators.required),
    batchSymbol: new FormControl({value: '', disabled: true}, Validators.required),
  })

}
