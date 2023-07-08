import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { UserRole } from 'src/app/models/modules/users/users.model';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { SelectBranchComponent } from 'src/app/components/select-windows/admin-windows/select-branch/select-branch.component';


@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}
  
  roleData: any;
  basicProfileData: any;

  isFetchingData = false;
  isSavingRole = false;
  isDeletingRole = false;
  isSaved = false;

  roleForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    staffCode: new FormControl(''),
    branch: new FormControl({value: '', disabled: true}, Validators.required),
    staffRole: new FormControl('', Validators.required),
  })

  selectdBranchId: any;
  selectdBranchData: any;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('selectBranchComponentReference', { read: SelectBranchComponent, static: false }) selectBranch!: SelectBranchComponent;
  
  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('users_user_id') as string;

    this.usersApi.getUserRole(id)
      .then((res) => {
        // console.log(res);
        this.roleData = res;
        this.isFetchingData = false;
        this.setRoleData();
        
        if (this.roleData.data().full_name == "")
          this.getBasicUser();
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  getBasicUser() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('users_user_id') as string;

    this.usersApi.getBasicUser(id)
      .then((res) => {
        // console.log(res);
        this.basicProfileData = res;
        this.isFetchingData = false;

        this.roleForm.controls.fullName.setValue(this.basicProfileData.data().full_name);
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateUserRole() {
    this.isSaved = true;
    
    const id = sessionStorage.getItem('users_user_id') as string;

    let data: UserRole = {
      created_at: this.roleData.data().created_at,
      updated_at: serverTimestamp(),
      full_name: this.roleForm.controls.fullName.value as string,
      staff_code: this.roleForm.controls.staffCode.value as string,
      staff_role: this.roleForm.controls.staffRole.value as string,
      branch: {
        id: this.selectdBranchId,
        data: {
          branch_name: this.selectdBranchData.branch_name,
          location: this.selectdBranchData.location
        }
      },
    }

    // console.log(data)

    if(this.roleForm.valid){
      this.isSavingRole = true; 

      this.usersApi.updateUserRole(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingRole = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingRole = false;
        });
    }
  }

  deleteUserRole(){
    this.isDeletingRole = true;

    const id = sessionStorage.getItem('users_user_id') as string;

    this.usersApi.deleteUserRole(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/users/users/all-users')
        this.isDeletingRole = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingRole = false;
      });
  }

  openBranchWindow(){
    // console.log("You are opening select branch window")
    this.selectBranch.openModal();
  }

  onBranchSelected(data: any){
    // console.log(data);

    this.roleForm.controls.branch.setValue(data.data().branch_name);
    this.selectdBranchId = data.id;
    this.selectdBranchData = data.data();
  }

  setRoleData(){
    this.roleForm.controls.fullName.setValue(this.roleData.data().full_name);
    this.roleForm.controls.staffCode.setValue(this.roleData.data().staff_code);
    this.roleForm.controls.branch.setValue(this.roleData.data().branch?.data.branch_name);
    this.roleForm.controls.staffRole.setValue(this.roleData.data().staff_role);

    this.selectdBranchId = this.roleData.data().branch.id;
    this.selectdBranchData = this.roleData.data().branch.data;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
