import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { System } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { MaintenanceSystemFormComponent } from '../maintenance-system-form/maintenance-system-form.component';


@Component({
  selector: 'app-new-maintenance-system',
  templateUrl: './new-maintenance-system.component.html',
  styleUrls: ['./new-maintenance-system.component.scss']
})
export class NewMaintenanceSystemComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('maintenanceSystemFormComponentReference', { read: MaintenanceSystemFormComponent, static: false }) systemForm!: MaintenanceSystemFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isFetchingData = false;
  isSavingSystem = false;

  thisId = 0;

  ngOnInit(): void {
    this.getLastSystem();
  }

  getLastSystem(){
    this.isFetchingData = true;

    this.maintenanceApi.getLastSystem()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.system_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.systemForm.systemForm.controls.systemCode.setValue(this.formatId.formatId(this.thisId, 4, "#", "SY"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createSystem() {
    this.systemForm.isSaved = true;
    
    if(this.systemForm.systemForm.valid){
      this.isSavingSystem = true;

      let data =this.setCreateSystemData();

      this.maintenanceApi.createSystem(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('maintenance_system_id', res.id);
            this.router.navigateByUrl("/modules/maintenance/systems/view-system");
          }
          this.isSavingSystem = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingSystem = false;
        });
    }
  }

  setCreateSystemData(){
    let data: System = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      system_code: this.thisId,
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

    // console.log(data);
    return data;
  }
  
}
