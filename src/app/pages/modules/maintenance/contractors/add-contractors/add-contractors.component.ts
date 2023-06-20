import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Contractor } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { ContractorFormComponent } from '../contractor-form/contractor-form.component';


@Component({
  selector: 'app-add-contractors',
  templateUrl: './add-contractors.component.html',
  styleUrls: ['./add-contractors.component.scss']
})
export class AddContractorsComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('contractorFormComponentReference', { read: ContractorFormComponent, static: false }) contractorForm!: ContractorFormComponent;

  selectedBranchData: any;
  selectedSystemData: any;
  
  isSavingContractor = false;

  createContractor() {
    this.isSavingContractor = true;

    let data: Contractor = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      contractor_code: this.contractorForm.contractorForm.controls.contractorCode.value as string,
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

    console.log(data);

    this.maintenanceApi.createContractor(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          sessionStorage.setItem('maintenance_contractor_id', res.id);
          this.router.navigateByUrl("/modules/maintenance/contractors/view-contractor");
        }
        this.isSavingContractor = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingContractor = false;
      });
  }

}
