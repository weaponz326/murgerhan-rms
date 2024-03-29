import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-maintenance-service-form',
  templateUrl: './maintenance-service-form.component.html',
  styleUrls: ['./maintenance-service-form.component.scss']
})
export class MaintenanceServiceFormComponent {

  @Output() openSystemWindow = new EventEmitter<any>();
  @Output() openContractorWindow = new EventEmitter<any>();

  isSaved = false;
  
  serviceForm = new FormGroup({
    serviceCode: new FormControl({value: '', disabled: true}),
    serviceSubject: new FormControl('', Validators.required),
    serviceType: new FormControl(''),
    contractor: new FormControl({value: '', disabled: true}, Validators.required),
    systemCode: new FormControl({value: '', disabled: true}),
    systemName: new FormControl({value: '', disabled: true}, Validators.required),
    cost: new FormControl(0.00),
    description: new FormControl(''),
    serviceStatus: new FormControl(''),
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    comments: new FormControl(''),
  })
  
}
