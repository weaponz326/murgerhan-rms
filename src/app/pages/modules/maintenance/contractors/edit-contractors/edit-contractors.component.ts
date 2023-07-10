import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Contractor } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ContractorFormComponent } from '../contractor-form/contractor-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-edit-contractors',
  templateUrl: './edit-contractors.component.html',
  styleUrls: ['./edit-contractors.component.scss']
})
export class EditContractorsComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('contractorFormComponentReference', { read: ContractorFormComponent, static: false }) contractorForm!: ContractorFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  contractorData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingContractor = false;
  isDeletingContractor = false;

  ngOnInit(): void {
    this.getContractor();
  }

  getContractor() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('maintenance_contractor_id') as string;

    this.maintenanceApi.getContractor(id)
      .then((res) => {
        // console.log(res);
        this.contractorData = res;
        this.isFetchingData = false;
        this.setContractorData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateContractor() {    
    this.contractorForm.isSaved = true;
    
    const id = sessionStorage.getItem('maintenance_contractor_id') as string;

    let data: Contractor = {
      created_at: this.contractorData.data().created_at,
      updated_at: serverTimestamp(),
      contractor_code: this.contractorData.data().contractor_code,
      contractor_name: this.contractorForm.contractorForm.controls.contractorName.value as string,
      contractor_type: this.contractorForm.contractorForm.controls.contractorType.value as string,
      main_service: this.contractorForm.contractorForm.controls.mainService.value as string,
      phone: this.contractorForm.contractorForm.controls.phone.value as string,
      email: this.contractorForm.contractorForm.controls.email.value as string,
      address: this.contractorForm.contractorForm.controls.address.value as string,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    if(this.contractorForm.contractorForm.valid){
      this.isSavingContractor = true;

      this.maintenanceApi.updateContractor(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingContractor = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingContractor = false;
        });
    }
  }

  deleteContractor() {
    this.isDeletingContractor = true;

    const id = sessionStorage.getItem('maintenance_contractor_id') as string;

    this.maintenanceApi.deleteContractor(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/maintenance/contractors/all-contractors')
        this.isDeletingContractor = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingContractor = false;
      });
  }

  setContractorData(){
    this.contractorForm.contractorForm.controls.contractorCode.setValue(this.formatId.formatId(this.contractorData.data().contractor_code, 4, "#", "CT"));
    this.contractorForm.contractorForm.controls.contractorName.setValue(this.contractorData.data().contractor_name);
    this.contractorForm.contractorForm.controls.contractorType.setValue(this.contractorData.data().contractor_type);
    this.contractorForm.contractorForm.controls.mainService.setValue(this.contractorData.data().main_service);
    this.contractorForm.contractorForm.controls.phone.setValue(this.contractorData.data().phone);
    this.contractorForm.contractorForm.controls.email.setValue(this.contractorData.data().email);
    this.contractorForm.contractorForm.controls.address.setValue(this.contractorData.data().address);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
