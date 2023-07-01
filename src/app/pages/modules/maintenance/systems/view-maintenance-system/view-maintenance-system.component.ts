import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { System } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { MaintenanceSystemFormComponent } from '../maintenance-system-form/maintenance-system-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-maintenance-system',
  templateUrl: './view-maintenance-system.component.html',
  styleUrls: ['./view-maintenance-system.component.scss']
})
export class ViewMaintenanceSystemComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService
  ) {}

  @ViewChild('maintenanceSystemFormComponentReference', { read: MaintenanceSystemFormComponent, static: false }) systemForm!: MaintenanceSystemFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  systemData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingSystem = false;
  isDeletingSystem = false;

  ngOnInit(): void {
    this.getSystem();
  }

  getSystem() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('maintenance_system_id') as string;

    this.maintenanceApi.getSystem(id)
      .then((res) => {
        console.log(res);
        this.systemData = res;
        this.isFetchingData = false;
        this.setSystemData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateSystem() {    
    const id = sessionStorage.getItem('maintenance_system_id') as string;

    let data: System = {
      created_at: this.systemData.data().created_at,
      updated_at: serverTimestamp(),
      system_code: this.systemForm.systemForm.controls.systemCode.value as string,
      system_name: this.systemForm.systemForm.controls.systemName.value as string,
      system_type: this.systemForm.systemForm.controls.systemType.value as string,
      location: this.systemForm.systemForm.controls.location.value as string,
      condition: this.systemForm.systemForm.controls.condition.value as string,
      description: this.systemForm.systemForm.controls.description.value as string,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    console.log(this.systemForm.systemForm.controls.systemCode.value)

    if(this.systemForm.systemForm.valid){
      this.isSavingSystem = true;
      this.maintenanceApi.updateSystem(id, data)
        .then((res) => {
          console.log(res);
          this.isSavingSystem = false;
        })
        .catch((err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isSavingSystem = false;
        });
    }
  }

  deleteSystem() {
    this.isDeletingSystem = true;

    const id = sessionStorage.getItem('maintenance_system_id') as string;

    this.maintenanceApi.deleteSystem(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/maintenance/systems/all-systems')
        this.isDeletingSystem = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingSystem = false;
      });
  }

  setSystemData(){
    this.systemForm.systemForm.controls.systemCode.setValue(this.systemData.data().system_code);
    this.systemForm.systemForm.controls.systemName.setValue(this.systemData.data().system_name);
    this.systemForm.systemForm.controls.systemType.setValue(this.systemData.data().system_type);
    this.systemForm.systemForm.controls.location.setValue(this.systemData.data().location);
    this.systemForm.systemForm.controls.condition.setValue(this.systemData.data().condition);
    this.systemForm.systemForm.controls.description.setValue(this.systemData.data().description);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

}
