import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Issue } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { MaintenanceIssueFormComponent } from '../maintenance-issue-form/maintenance-issue-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-maintnenance-issue',
  templateUrl: './view-maintnenance-issue.component.html',
  styleUrls: ['./view-maintnenance-issue.component.scss']
})
export class ViewMaintnenanceIssueComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService
  ) {}

  @ViewChild('maintenanceIssueFormComponentReference', { read: MaintenanceIssueFormComponent, static: false }) issueForm!: MaintenanceIssueFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  issueData: any;
  selectedBranchData: any;
  selectedSystemData: any;

  isFetchingData = false;
  isSavingIssue = false;
  isDeletingIssue = false;

  ngOnInit(): void {
    this.getIssue();
  }

  getIssue() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('maintenance_issue_id') as string;

    this.maintenanceApi.getIssue(id)
      .then((res) => {
        console.log(res);
        this.issueData = res;
        this.isFetchingData = false;
        this.setIssueData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateIssue() {
    this.isSavingIssue = true;
    
    const id = sessionStorage.getItem('maintenance_issue_id') as string;

    let data: Issue = {
      created_at: this.issueData.data().created_at,
      updated_at: serverTimestamp(),
      issue_code: this.issueForm.issueForm.controls.issueCode.value as string,
      issue_subject: this.issueForm.issueForm.controls.issueSubject.value as string,
      issue_type: this.issueForm.issueForm.controls.issueType.value as string,
      issue_date: this.issueForm.issueForm.controls.issueDate.value,
      reported_to: this.issueForm.issueForm.controls.reportedTo.value as string,
      description: this.issueForm.issueForm.controls.description.value as string,
      issue_status: this.issueForm.issueForm.controls.issueStatus.value as string,
      comments: this.issueForm.issueForm.controls.comments.value as string,
      system: {
        id: this.selectedSystemData.id,
        data: {
          system_code: this.selectedSystemData.data.system_code,
          system_name: this.selectedSystemData.data.system_name,
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

    this.maintenanceApi.updateIssue(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingIssue = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingIssue = false;
      });
  }

  deleteIssue() {
    this.isDeletingIssue = true;

    const id = sessionStorage.getItem('maintenance_issue_id') as string;

    this.maintenanceApi.deleteIssue(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/maintenance/issues/all-issues')
        this.isDeletingIssue = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingIssue = false;
      });
  }

  setIssueData(){
    this.issueForm.issueForm.controls.issueCode.setValue(this.issueData.data().issue_code);
    this.issueForm.issueForm.controls.issueSubject.setValue(this.issueData.data().issue_subject);
    this.issueForm.issueForm.controls.issueType.setValue(this.issueData.data().issue_type);
    this.issueForm.issueForm.controls.issueDate.setValue(this.issueData.data().issue_date);
    this.issueForm.issueForm.controls.system.setValue(this.issueData.data().system.data.system_name);
    this.issueForm.issueForm.controls.reportedTo.setValue(this.issueData.data().reported_to);
    this.issueForm.issueForm.controls.description.setValue(this.issueData.data().description);
    this.issueForm.issueForm.controls.issueStatus.setValue(this.issueData.data().issue_status);
    this.issueForm.issueForm.controls.comments.setValue(this.issueData.data().comments);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
