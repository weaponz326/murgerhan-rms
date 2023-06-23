import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';


@Component({
  selector: 'app-user-attendance-records',
  templateUrl: './user-attendance-records.component.html',
  styleUrls: ['./user-attendance-records.component.scss']
})
export class UserAttendanceRecordsComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  userroleData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingUserRole = false;

  userForm = new FormGroup({
    staffCode: new FormControl({value: '', disabled: true}),
    fullName: new FormControl({value: '', disabled: true}),
    staffRole: new FormControl({value: '', disabled: true}),
  })
  
  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('attendance_user_id') as string;

    this.usersApi.getUserRole(id)
      .then((res) => {
        console.log(res);
        this.userroleData = res;
        this.isFetchingData = false;
        this.setUserRoleData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  setUserRoleData(){
    this.userForm.controls.staffCode.setValue(this.userroleData.data().staff_code);
    this.userForm.controls.fullName.setValue(this.userroleData.data().full_name);
    this.userForm.controls.staffRole.setValue(this.userroleData.data().staff_role);
  }

}
