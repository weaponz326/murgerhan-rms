import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { UserRole } from 'src/app/models/modules/users/users.model';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


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

  isFetchingData = false;
  isSavingRole = false;
  isDeletingRole = false;

  roleForm = new FormGroup({
    fullName: new FormControl({value: "", disabled: true}),
    staffID: new FormControl(),
    branch: new FormControl(''),
    staffRole: new FormControl(''),
  })

  selectedRoleData: any;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  
  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    this.isFetchingData = true;
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getUserRole(id)
      .then((res) => {
        console.log(res);
        this.roleData = res;
        this.isFetchingData = false;
        this.setRoleData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateRole() {
    this.isSavingRole = true;
    
    const id = sessionStorage.getItem('user_role_id') as string;

    let data: UserRole = {
      created_at: this.roleData.data().created_at,
      updated_at: serverTimestamp(),
      full_name: this.roleForm.controls.fullName.value as string,
      staff_id: this.roleForm.controls.staffID.value,
      branch: {
        id: this.selectedRoleData.id,
        data: {
          branch_name: this.selectedRoleData.data().role_name,
          location: this.selectedRoleData.data().location
        }
      },
      staff_role: this.roleForm.controls.staffRole.value as string,
    }

    this.usersApi.updateUserRole(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingRole = false;
        this.router.navigateByUrl('/settings/additional');
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingRole = false;
      });
  }

  deleteRole(){
    this.isDeletingRole = true;

    const id = sessionStorage.getItem('user_role_id') as string;

    this.usersApi.deleteUserRole(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/users/users/all-users')
        this.isDeletingRole = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingRole = false;
      });
  }

  setRoleData(){
    this.roleForm.controls.fullName.setValue(this.roleData.data().full_name);
    this.roleForm.controls.staffID.setValue(this.roleData.data().staff_id);
    this.roleForm.controls.branch.setValue(this.roleData.data().branch?.data.branch_name);
    this.roleForm.controls.staffRole.setValue(this.roleData.data().staff_role);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
