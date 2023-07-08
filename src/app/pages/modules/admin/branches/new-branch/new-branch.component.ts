import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';
import { Branch } from 'src/app/models/modules/admin/admin.model';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.scss']
})
export class NewBranchComponent {

  constructor(
    private router: Router,
    private adminApi: AdminApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isSavingBranch = false;
  isSaved = false;

  branchForm = new FormGroup({
    branchName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    specialFeatures: new FormControl('')
  })

  createBranch() {
    this.isSaved = true;

    let data: Branch = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      branch_name: this.branchForm.controls.branchName.value as string,
      location: this.branchForm.controls.location.value as string,
      special_features: this.branchForm.controls.specialFeatures.value as string,
      number_of_staff: 0,
      manager: {
        id: "",
        data: {
          staff_id: "",
          full_name: ""
        }
      },
    }

    // console.log(data);

    if(this.branchForm.valid){
      this.isSavingBranch = true;

      this.adminApi.createBranch(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('admin_branch_id', res.id);
            this.router.navigateByUrl("/modules/admin/branches/edit-branch");
          }
          this.isSavingBranch = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingBranch = false;
        });
    }
  }

}
