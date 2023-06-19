import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.scss']
})
export class IncidentDetailsComponent {

  incidentDetails = new FormGroup({
    description: new FormControl(''),
    resolution: new FormControl(''),
    comments: new FormControl(''),
  })
  
}
