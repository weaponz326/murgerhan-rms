import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Service } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { MaintenanceServiceFormComponent } from '../maintenance-service-form/maintenance-service-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { SelectSystemComponent } from 'src/app/components/select-windows/maintenance-windows/select-system/select-system.component';
import { SelectContractorComponent } from 'src/app/components/select-windows/maintenance-windows/select-contractor/select-contractor.component';


@Component({
  selector: 'app-view-maintenance-service',
  templateUrl: './view-maintenance-service.component.html',
  styleUrls: ['./view-maintenance-service.component.scss']
})
export class ViewMaintenanceServiceComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService
  ) {}

  @ViewChild('maintenanceServiceFormComponentReference', { read: MaintenanceServiceFormComponent, static: false }) serviceForm!: MaintenanceServiceFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('selectSystemComponentReference', { read: SelectSystemComponent, static: false }) selectSystem!: SelectSystemComponent;
  @ViewChild('selectContractorComponentReference', { read: SelectContractorComponent, static: false }) selectContractor!: SelectContractorComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  selectedSystemId: any;
  selectedSystemData: any;  
  selectedContractorId: any;
  selectedContractorData: any;

  serviceData: any;

  isFetchingData = false;
  isSavingService = false;
  isDeletingService = false;

  ngOnInit(): void {
    this.getService();
  }

  getService() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('maintenance_service_id') as string;

    this.maintenanceApi.getService(id)
      .then((res) => {
        console.log(res);
        this.serviceData = res;
        this.isFetchingData = false;
        this.setServiceData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateService() {
    this.isSavingService = true;
    
    const id = sessionStorage.getItem('maintenance_service_id') as string;

    let data: Service = {
      created_at: this.serviceData.data().created_at,
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

    this.maintenanceApi.updateService(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingService = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingService = false;
      });
  }

  deleteService() {
    this.isDeletingService = true;

    const id = sessionStorage.getItem('maintenance_service_id') as string;

    this.maintenanceApi.deleteService(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/maintenance/services/all-services')
        this.isDeletingService = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingService = false;
      });
  }

  setServiceData(){
    this.serviceForm.serviceForm.controls.serviceCode.setValue(this.serviceData.data().service_code);
    this.serviceForm.serviceForm.controls.serviceSubject.setValue(this.serviceData.data().service_subject);
    this.serviceForm.serviceForm.controls.serviceType.setValue(this.serviceData.data().service_type);
    this.serviceForm.serviceForm.controls.contractor.setValue(this.serviceData.data().contractor.data.contractor_name);
    this.serviceForm.serviceForm.controls.systemCode.setValue(this.serviceData.data().system.data.system_code);
    this.serviceForm.serviceForm.controls.systemName.setValue(this.serviceData.data().system.data.system_name);
    this.serviceForm.serviceForm.controls.cost.setValue(this.serviceData.data().cost);
    this.serviceForm.serviceForm.controls.description.setValue(this.serviceData.data().description);
    this.serviceForm.serviceForm.controls.serviceStatus.setValue(this.serviceData.data().service_status);
    this.serviceForm.serviceForm.controls.dateFrom.setValue(this.serviceData.data().date_from);
    this.serviceForm.serviceForm.controls.dateTo.setValue(this.serviceData.data().date_to);
    this.serviceForm.serviceForm.controls.comments.setValue(this.serviceData.data().comments);

    this.selectedSystemId = this.serviceData.data().system.id;
    this.selectedSystemData = this.serviceData.data().system.data;
    this.selectedContractorId = this.serviceData.data().contractor.id;
    this.selectedContractorData = this.serviceData.data().contractor.data;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  openSystemWindow(){
    console.log("You are opening select system window")
    this.selectSystem.openModal();
  }

  onSystemSelected(systemData: any){
    console.log(systemData);

    this.selectedSystemData = systemData;
    this.serviceForm.serviceForm.controls.systemCode.setValue(systemData.data().system_code);
    this.serviceForm.serviceForm.controls.systemName.setValue(systemData.data().system_name);

    this.selectedSystemId = systemData.id;
    this.selectedSystemData = systemData.data();
  }

  openContractorWindow(){
    console.log("You are opening select contractor window")
    this.selectContractor.openModal();
  }

  onContractorSelected(contractorData: any){
    console.log(contractorData);

    this.selectedContractorData = contractorData;
    this.serviceForm.serviceForm.controls.contractor.setValue(contractorData.data().contractor_name);

    this.selectedContractorId = contractorData.id;
    this.selectedContractorData = contractorData.data();
  }

  
}
