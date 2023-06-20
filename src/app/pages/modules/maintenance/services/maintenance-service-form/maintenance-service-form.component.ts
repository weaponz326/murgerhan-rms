import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-maintenance-service-form',
  templateUrl: './maintenance-service-form.component.html',
  styleUrls: ['./maintenance-service-form.component.scss']
})
export class MaintenanceServiceFormComponent {

  serviceForm = new FormGroup({
    serviceCode: new FormControl(''),
    serviceSubject: new FormControl(''),
    serviceType: new FormControl(''),
    contractor: new FormControl(''),
    system: new FormControl(''),
    cost: new FormControl(0.00),
    description: new FormControl(''),
    serviceStatus: new FormControl(''),
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    comments: new FormControl(''),
  })
  
}
