import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-maintenance-system-form',
  templateUrl: './maintenance-system-form.component.html',
  styleUrls: ['./maintenance-system-form.component.scss']
})
export class MaintenanceSystemFormComponent {

  systemForm = new FormGroup({
    systemCode: new FormControl(''),
    systemName: new FormControl(''),
    systemType: new FormControl(''),
    location: new FormControl(''),
    condition: new FormControl(''),
    description: new FormControl(''),
  })
  
}
