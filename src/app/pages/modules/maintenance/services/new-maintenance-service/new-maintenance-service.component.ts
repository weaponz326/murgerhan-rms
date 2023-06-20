import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Service } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { MaintenanceServiceFormComponent } from '../maintenance-service-form/maintenance-service-form.component';


@Component({
  selector: 'app-new-maintenance-service',
  templateUrl: './new-maintenance-service.component.html',
  styleUrls: ['./new-maintenance-service.component.scss']
})
export class NewMaintenanceServiceComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('maintenanceServiceFormComponentReference', { read: MaintenanceServiceFormComponent, static: false }) serviceForm!: MaintenanceServiceFormComponent;

  selectedBranchData: any;
  selectedSystemData: any;
  selectedContractorData: any;
  
  isSavingService = false;

  createService() {
    this.isSavingService = true;

    let data: Service = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      service_code: this.serviceForm.serviceForm.controls.serviceCode.value as string,
      service_subject: this.serviceForm.serviceForm.controls.serviceSubject.value as string,
      service_type: this.serviceForm.serviceForm.controls.serviceType.value as string,
      cost: this.serviceForm.serviceForm.controls.cost.value as number,
      date_from: this.serviceForm.serviceForm.controls.dateFrom.value,
      date_to: this.serviceForm.serviceForm.controls.dateTo.value,
      description: this.serviceForm.serviceForm.controls.description.value as string,
      service_status: this.serviceForm.serviceForm.controls.serviceStatus.value as string,
      comments: this.serviceForm.serviceForm.controls.comments.value as string,
      contractor: {
        id: this.selectedContractorData.id,
        data: {
          contractor_code: this.selectedContractorData.data.contractor_code,
          contractor_name: this.selectedContractorData.data.contractor_name,
        }
      },
      system: {
        id: this.selectedSystemData.id,
        data: {
          system_code: this.selectedSystemData.data.system_code,
          system_name: this.selectedSystemData.data.system_name,
        }
      },
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    console.log(data);

    this.maintenanceApi.createService(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          sessionStorage.setItem('maintenance_service_id', res.id);
          this.router.navigateByUrl("/modules/maintenance/services/view-service");
        }
        this.isSavingService = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingService = false;
      });
  }
  
}
