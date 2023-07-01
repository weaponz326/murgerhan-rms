import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Unit } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { UnitFormComponent } from '../unit-form/unit-form.component';


@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('unitFormComponentReference', { read: UnitFormComponent, static: false }) unitForm!: UnitFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isSavingUnit = false;

  createUnit() {
    let data: Unit = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      unit_code: this.unitForm.unitForm.controls.unitCode.value as string,
      unit_name: this.unitForm.unitForm.controls.unitName.value as string,
      unit_type: this.unitForm.unitForm.controls.unitType.value as string,
      location: this.unitForm.unitForm.controls.location.value as string,
      condition: this.unitForm.unitForm.controls.condition.value as string,
      description: this.unitForm.unitForm.controls.description.value as string,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    console.log(data);

    if(this.unitForm.unitForm.valid){
      this.isSavingUnit = true;

      this.housekeepingApi.createUnit(data)
        .then((res: any) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('housekeeping_unit_id', res.id);
            this.router.navigateByUrl("/modules/housekeeping/units/edit-unit");
          }
          this.isSavingUnit = false;
        })
        .catch((err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isSavingUnit = false;
        });
    }
  }
  
}
