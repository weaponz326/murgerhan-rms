import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-maintenance-service-form',
  templateUrl: './maintenance-service-form.component.html',
  styleUrls: ['./maintenance-service-form.component.scss']
})
export class MaintenanceServiceFormComponent {

  @Output() openSystemWindow = new EventEmitter<any>();
  @Output() openContractorWindow = new EventEmitter<any>();

  serviceForm = new FormGroup({
    serviceCode: new FormControl(''),
    serviceSubject: new FormControl(''),
    serviceType: new FormControl(''),
    contractor: new FormControl({value: '', disabled: true}),
    systemCode: new FormControl({value: '', disabled: true}),
    systemName: new FormControl({value: '', disabled: true}),
    cost: new FormControl(0.00),
    description: new FormControl(''),
    serviceStatus: new FormControl(''),
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    comments: new FormControl(''),
  })
  
}
