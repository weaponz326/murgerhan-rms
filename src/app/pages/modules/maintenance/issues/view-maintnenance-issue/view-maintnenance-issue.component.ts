import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Issue } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { MaintenanceIssueFormComponent } from '../maintenance-issue-form/maintenance-issue-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { SelectSystemComponent } from 'src/app/components/select-windows/maintenance-windows/select-system/select-system.component';
import { SelectUserRoleComponent } from 'src/app/components/select-windows/users-windows/select-user-role/select-user-role.component';


@Component({
  selector: 'app-view-maintnenance-issue',
  templateUrl: './view-maintnenance-issue.component.html',
  styleUrls: ['./view-maintnenance-issue.component.scss']
})
export class ViewMaintnenanceIssueComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('maintenanceIssueFormComponentReference', { read: MaintenanceIssueFormComponent, static: false }) issueForm!: MaintenanceIssueFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('selectSystemComponentReference', { read: SelectSystemComponent, static: false }) selectSystem!: SelectSystemComponent;
  @ViewChild('selectUserRoleComponentReference', { read: SelectUserRoleComponent, static: false }) selectUserRole!: SelectUserRoleComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  selectedSystemId: any;
  selectedSystemData: any;  
  selectedUserRoleId: any;
  selectedUserRoleData: any;

  issueData: any;
  issueImageListData: any;

  isFetchingData = false;
  isSavingIssue = false;
  isDeletingIssue = false;

  ngOnInit(): void {
    this.getIssue();
    this.getIssueImageList();
  }

  getIssue() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('maintenance_issue_id') as string;

    this.maintenanceApi.getIssue(id)
      .then((res) => {
        // console.log(res);
        this.issueData = res;
        this.isFetchingData = false;
        this.setIssueData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateIssue() {    
    this.issueForm.isSaved = true;
    
    if(this.issueForm.issueForm.valid && this.selectedUserRoleId){
      this.isSavingIssue = true;

      const id = sessionStorage.getItem('maintenance_issue_id') as string;
      let data = this.setUpdateIssueData();
      
      this.maintenanceApi.updateIssue(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingIssue = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingIssue = false;
        });
    }
  }

  deleteIssue() {
    this.isDeletingIssue = true;

    const id = sessionStorage.getItem('maintenance_issue_id') as string;

    this.maintenanceApi.deleteIssue(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/maintenance/issues/all-issues')
        this.isDeletingIssue = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingIssue = false;
      });
  }

  getIssueImageList(){
    this.maintenanceApi.getIssueImageList()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs.length != 0)
            this.issueImageListData = res.docs.slice(0,4);
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
        }
      )
  }
  
  setIssueData(){
    this.issueForm.issueForm.controls.issueCode.setValue(this.formatId.formatId(this.issueData.data().issue_code, 5, "#", "UE"));
    this.issueForm.issueForm.controls.issueSubject.setValue(this.issueData.data().issue_subject);
    this.issueForm.issueForm.controls.issueType.setValue(this.issueData.data().issue_type);
    this.issueForm.issueForm.controls.issueDate.setValue(this.issueData.data().issue_date);    
    this.issueForm.issueForm.controls.reportedTo.setValue(this.issueData.data().reported_to.data.full_name);
    this.issueForm.issueForm.controls.description.setValue(this.issueData.data().description);
    this.issueForm.issueForm.controls.issueStatus.setValue(this.issueData.data().issue_status);
    this.issueForm.issueForm.controls.comments.setValue(this.issueData.data().comments);

    if(this.issueData.data().system.data.system_name){
      this.issueForm.issueForm.controls.systemCode.setValue(this.formatId.formatId(this.issueData.data().system.data.system_code, 4, "#", "SY"));
      this.issueForm.issueForm.controls.systemName.setValue(this.issueData.data().system.data.system_name);
    }

    this.selectedSystemId = this.issueData.data().system.id;
    this.selectedSystemData = this.issueData.data().system.data;
    this.selectedUserRoleId = this.issueData.data().reported_to.id;
    this.selectedUserRoleData = this.issueData.data().reported_to.data;
  }

  setUpdateIssueData(){
    let data: Issue = {
      created_at: this.issueData.data().created_at,
      updated_at: serverTimestamp(),
      issue_code: this.issueData.data().issue_code,
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

    // console.log(data);
    return data;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  openSystemWindow(){
    // console.log("You are opening select system window")
    this.selectSystem.openModal();
  }

  onSystemSelected(systemData: any){
    // console.log(systemData);

    this.selectedSystemData = systemData;
    this.issueForm.issueForm.controls.systemCode.setValue(this.formatId.formatId(systemData.data().system_code, 4, "#", "SY"));
    this.issueForm.issueForm.controls.systemName.setValue(systemData.data().system_name);

    this.selectedSystemId = systemData.id;
    this.selectedSystemData = systemData.data();
  }

  openUserRoleWindow(){
    // console.log("You are opening select user role window")
    this.selectUserRole.openModal();
  }

  onUserRoleSelected(userRoleData: any){
    // console.log(userRoleData);
    this.selectedUserRoleData = userRoleData;
    this.issueForm.issueForm.controls.reportedTo.setValue(userRoleData.data().full_name);

    this.selectedUserRoleId = userRoleData.id;
    this.selectedUserRoleData = userRoleData.data();
  }
  
}
