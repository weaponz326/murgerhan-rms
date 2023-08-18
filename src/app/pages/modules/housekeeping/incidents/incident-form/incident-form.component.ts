import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss']
})
export class IncidentFormComponent {

  @Output() openUserRoleWindow = new EventEmitter<any>();

  isSaved = false;
  
  incidentForm = new FormGroup({
    incidentCode: new FormControl({value: '', disabled: true}),
    incidentSubject: new FormControl('', Validators.required),
    incidentType: new FormControl(''),
    incidentDate: new FormControl(),
    incidentStatus: new FormControl('Unresolved'),
    reportedTo: new FormControl({value: '', disabled: true}, Validators.required),
  })

}
