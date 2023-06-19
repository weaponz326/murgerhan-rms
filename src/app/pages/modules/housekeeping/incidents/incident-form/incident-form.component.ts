import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss']
})
export class IncidentFormComponent {

  incidentForm = new FormGroup({
    incidentCode: new FormControl(''),
    incidentSubject: new FormControl(''),
    incidentType: new FormControl(''),
    incidentDate: new FormControl(),
    incidentStatus: new FormControl(''),
  })

}
