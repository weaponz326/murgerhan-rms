import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Issue } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { MaintenanceIssueFormComponent } from '../maintenance-issue-form/maintenance-issue-form.component';
import { SelectSystemComponent } from 'src/app/components/select-windows/maintenance-windows/select-system/select-system.component';
import { SelectUserRoleComponent } from 'src/app/components/select-windows/users-windows/select-user-role/select-user-role.component';


@Component({
  selector: 'app-new-maintnenance-issue',
  templateUrl: './new-maintnenance-issue.component.html',
  styleUrls: ['./new-maintnenance-issue.component.scss']
})
export class NewMaintnenanceIssueComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('maintenanceIssueFormComponentReference', { read: MaintenanceIssueFormComponent, static: false }) issueForm!: MaintenanceIssueFormComponent;
  @ViewChild('selectSystemComponentReference', { read: SelectSystemComponent, static: false }) selectSystem!: SelectSystemComponent;
  @ViewChild('selectUserRoleComponentReference', { read: SelectUserRoleComponent, static: false }) selectUserRole!: SelectUserRoleComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  selectedSystemId: any;
  selectedSystemData: any;  
  selectedUserRoleId: any;
  selectedUserRoleData: any;

  isSavingIssue = false;

  ngAfterViewInit(){
    this.issueForm.issueForm.controls.issueDate.setValue(new Date().toISOString().slice(0, 16));
  }

  createIssue() {
    let data: Issue = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      issue_code: this.issueForm.issueForm.controls.issueCode.value as string,
      issue_subject: this.issueForm.issueForm.controls.issueSubject.value as string,
      issue_type: this.issueForm.issueForm.controls.issueType.value as string,
      issue_date: this.issueForm.issueForm.controls.issueDate.value,
      description: this.issueForm.issueForm.controls.description.value as string,
      issue_status: this.issueForm.issueForm.controls.issueStatus.value as string,
      comments: this.issueForm.issueForm.controls.comments.value as string,
      reported_to: {
        id: this.selectedUserRoleId,
        data: {
          staff_code: this.selectedUserRoleData.staff_code,
          full_name: this.selectedUserRoleData.full_name,
          staff_role: this.selectedUserRoleData.staff_role,
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

    console.log(data);

    if(this.issueForm.issueForm.valid){
      this.isSavingIssue = true;
      
      this.maintenanceApi.createIssue(data)
        .then((res: any) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('maintenance_issue_id', res.id);
            this.router.navigateByUrl("/modules/maintenance/issues/view-issue");
          }
          this.isSavingIssue = false;
        })
        .catch((err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isSavingIssue = false;
        });
      }
  }

  openSystemWindow(){
    console.log("You are opening select system window")
    this.selectSystem.openModal();
  }

  onSystemSelected(systemData: any){
    console.log(systemData);

    this.selectedSystemData = systemData;
    this.issueForm.issueForm.controls.systemCode.setValue(systemData.data().system_code);
    this.issueForm.issueForm.controls.systemName.setValue(systemData.data().system_name);

    this.selectedSystemId = systemData.id;
    this.selectedSystemData = systemData.data();
  }

  openUserRoleWindow(){
    console.log("You are opening select user role window")
    this.selectUserRole.openModal();
  }

  onUserRoleSelected(userRoleData: any){
    console.log(userRoleData);
    this.selectedUserRoleData = userRoleData;
    this.issueForm.issueForm.controls.reportedTo.setValue(userRoleData.data().full_name);

    this.selectedUserRoleId = userRoleData.id;
    this.selectedUserRoleData = userRoleData.data();
  }

}
