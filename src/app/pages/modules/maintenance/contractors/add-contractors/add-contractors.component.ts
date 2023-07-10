import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Contractor } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

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
    private maintenanceApi: MaintenanceApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('contractorFormComponentReference', { read: ContractorFormComponent, static: false }) contractorForm!: ContractorFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isFetchingData = false;
  isSavingContractor = false;

  thisId = 0;

  ngOnInit(): void {
    this.getLastContractor();
  }

  getLastContractor(){
    this.isFetchingData = true;

    this.maintenanceApi.getLastContractor()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.contractor_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.contractorForm.contractorForm.controls.contractorCode.setValue(this.formatId.formatId(this.thisId, 4, "#", "CT"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createContractor() {
    this.contractorForm.isSaved = true;
    let data: Contractor = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      contractor_code: this.thisId,
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

    // console.log(data);

    if(this.contractorForm.contractorForm.valid){
      this.isSavingContractor = true;

      this.maintenanceApi.createContractor(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('maintenance_contractor_id', res.id);
            this.router.navigateByUrl("/modules/maintenance/contractors/edit-contractor");
          }
          this.isSavingContractor = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingContractor = false;
        });
    }
  }

}
