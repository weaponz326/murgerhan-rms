import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Unit } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { UnitFormComponent } from '../unit-form/unit-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('unitFormComponentReference', { read: UnitFormComponent, static: false }) unitForm!: UnitFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  unitData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingUnit = false;
  isDeletingUnit = false;

  ngOnInit(): void {
    this.getUnit();
  }

  getUnit() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('housekeeping_unit_id') as string;

    this.housekeepingApi.getUnit(id)
      .then((res) => {
        // console.log(res);
        this.unitData = res;
        this.isFetchingData = false;
        this.setUnitData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateUnit() {    
    this.unitForm.isSaved = true;
    
    const id = sessionStorage.getItem('housekeeping_unit_id') as string;

    let data: Unit = {
      created_at: this.unitData.data().created_at,
      updated_at: serverTimestamp(),
      unit_code: this.unitData.data().unit_code,
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

    if(this.unitForm.unitForm.valid){
      this.isSavingUnit = true;

      this.housekeepingApi.updateUnit(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingUnit = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingUnit = false;
        });
    }
  }

  deleteUnit() {
    this.isDeletingUnit = true;

    const id = sessionStorage.getItem('housekeeping_unit_id') as string;

    this.housekeepingApi.deleteUnit(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/housekeeping/units/all-units')
        this.isDeletingUnit = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingUnit = false;
      });
  }

  setUnitData(){
    this.unitForm.unitForm.controls.unitCode.setValue(this.formatId.formatId(this.unitData.data().unit_code, 4, "#", "UT"));
    this.unitForm.unitForm.controls.unitName.setValue(this.unitData.data().unit_name);
    this.unitForm.unitForm.controls.unitType.setValue(this.unitData.data().unit_type);
    this.unitForm.unitForm.controls.location.setValue(this.unitData.data().location);
    this.unitForm.unitForm.controls.condition.setValue(this.unitData.data().condition);
    this.unitForm.unitForm.controls.description.setValue(this.unitData.data().description);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
