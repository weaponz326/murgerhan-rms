import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';
import { Branch } from 'src/app/models/modules/admin/admin.model';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.scss']
})
export class EditBranchComponent {

  constructor(
    private router: Router,
    private adminApi: AdminApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  branchData: any;

  isFetchingData = false;
  isSavingBranch = false;
  isDeletingBranch = false;
  isSaved = false;

  branchForm = new FormGroup({
    branchName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    specialFeatures: new FormControl(''),
    manager: new FormControl({value: '', disabled: true}),
    noOfStaff: new FormControl({value: 0, disabled: true}),
  })

  ngOnInit(): void {
    this.getBranch();
  }

  getBranch() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('admin_branch_id') as string;

    this.adminApi.getBranch(id)
      .then((res) => {
        console.log(res);
        this.branchData = res;
        this.isFetchingData = false;
        this.setBranchData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateBranch() {
    this.isSaved = true;    
    const id = sessionStorage.getItem('admin_branch_id') as string;

    let data: Branch = {
      created_at: this.branchData.data().created_at,
      updated_at: serverTimestamp(),
      branch_name: this.branchForm.controls.branchName.value as string,
      location: this.branchForm.controls.location.value as string,
      special_features: this.branchForm.controls.specialFeatures.value as string,
      number_of_staff: this.branchData.data().number_of_staff,
      manager: {
        id: this.branchData.data().manager?.id,
        data: {
          staff_id: this.branchData.data().manager?.data?.staff_id,
          full_name: this.branchData.data().manager?.data?.full_name
        }
      },
    }

    if(this.branchForm.valid){
      this.isSavingBranch = true;

      this.adminApi.updateBranch(id, data)
        .then((res) => {
          console.log(res);
          this.isSavingBranch = false;
        })
        .catch((err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isSavingBranch = false;
        });
    }
  }

  deleteBranch() {
    this.isDeletingBranch = true;

    const id = sessionStorage.getItem('admin_branch_id') as string;

    this.adminApi.deleteBranch(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/admin/branches/all-branches')
        this.isDeletingBranch = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingBranch = false;
      });
  }

  setBranchData(){
    this.branchForm.controls.branchName.setValue(this.branchData.data().branch_name);
    this.branchForm.controls.location.setValue(this.branchData.data().location);
    this.branchForm.controls.specialFeatures.setValue(this.branchData.data().special_features);
    this.branchForm.controls.manager.setValue(this.branchData.data().manager?.data?.full_name);
    this.branchForm.controls.noOfStaff.setValue(this.branchData.data().number_of_staff);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

}
