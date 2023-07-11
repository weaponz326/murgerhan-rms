import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Service } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { MaintenanceServiceFormComponent } from '../maintenance-service-form/maintenance-service-form.component';
import { SelectSystemComponent } from 'src/app/components/select-windows/maintenance-windows/select-system/select-system.component';
import { SelectContractorComponent } from 'src/app/components/select-windows/maintenance-windows/select-contractor/select-contractor.component';


@Component({
  selector: 'app-new-maintenance-service',
  templateUrl: './new-maintenance-service.component.html',
  styleUrls: ['./new-maintenance-service.component.scss']
})
export class NewMaintenanceServiceComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('maintenanceServiceFormComponentReference', { read: MaintenanceServiceFormComponent, static: false }) serviceForm!: MaintenanceServiceFormComponent;
  @ViewChild('selectSystemComponentReference', { read: SelectSystemComponent, static: false }) selectSystem!: SelectSystemComponent;
  @ViewChild('selectContractorComponentReference', { read: SelectContractorComponent, static: false }) selectContractor!: SelectContractorComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  selectedSystemId: any;
  selectedSystemData: any;  
  selectedContractorId: any;
  selectedContractorData: any;
  
  isFetchingData = false;
  isSavingService = false;

  thisId = 0;

  ngOnInit(): void {
    this.getLastService();
  }

  getLastService(){
    this.isFetchingData = true;

    this.maintenanceApi.getLastService()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.service_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.serviceForm.serviceForm.controls.serviceCode.setValue(this.formatId.formatId(this.thisId, 5, "#", "SE"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createService() {
    this.serviceForm.isSaved = true;
    
    if(this.serviceForm.serviceForm.valid){
      this.isSavingService = true;

      let data = this.setCreateServiceData();

      this.maintenanceApi.createService(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('maintenance_service_id', res.id);
            this.router.navigateByUrl("/modules/maintenance/services/view-service");
          }
          this.isSavingService = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingService = false;
        });
    }
  }

  setCreateServiceData(){
    let data: Service = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      service_code: this.thisId,
      service_subject: this.serviceForm.serviceForm.controls.serviceSubject.value as string,
      service_type: this.serviceForm.serviceForm.controls.serviceType.value as string,
      cost: this.serviceForm.serviceForm.controls.cost.value as number,
      date_from: this.serviceForm.serviceForm.controls.dateFrom.value,
      date_to: this.serviceForm.serviceForm.controls.dateTo.value,
      description: this.serviceForm.serviceForm.controls.description.value as string,
      service_status: this.serviceForm.serviceForm.controls.serviceStatus.value as string,
      comments: this.serviceForm.serviceForm.controls.comments.value as string,
      contractor: {
        id: this.selectedContractorId,
        data: {
          contractor_code: this.selectedContractorData.contractor_code,
          contractor_name: this.selectedContractorData.contractor_name,
        }
      },
      system: {
        id: this.selectedSystemId,
        data: {
          system_code: this.selectedSystemData.system_code,
          system_name: this.selectedSystemData.system_name,
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

    // console.log(data);
    return data;
  }
  
  openSystemWindow(){
    // console.log("You are opening select system window")
    this.selectSystem.openModal();
  }

  onSystemSelected(systemData: any){
    // console.log(systemData);

    this.selectedSystemData = systemData;
    this.serviceForm.serviceForm.controls.systemCode.setValue(this.formatId.formatId(systemData.data().system_code, 4, "#", "SY"));
    this.serviceForm.serviceForm.controls.systemName.setValue(systemData.data().system_name);

    this.selectedSystemId = systemData.id;
    this.selectedSystemData = systemData.data();
  }

  openContractorWindow(){
    // console.log("You are opening select contractor window")
    this.selectContractor.openModal();
  }

  onContractorSelected(contractorData: any){
    // console.log(contractorData);

    this.selectedContractorData = contractorData;
    this.serviceForm.serviceForm.controls.contractor.setValue(contractorData.data().contractor_name);

    this.selectedContractorId = contractorData.id;
    this.selectedContractorData = contractorData.data();
  }

}
