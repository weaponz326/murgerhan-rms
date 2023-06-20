import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Issue } from 'src/app/models/modules/maintenance/maintenance.model';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { MaintenanceIssueFormComponent } from '../maintenance-issue-form/maintenance-issue-form.component';


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

  selectedBranchData: any;
  selectedSystemData: any;
  
  isSavingIssue = false;

  createIssue() {
    this.isSavingIssue = true;

    let data: Issue = {
      created_at: serverTimestamp(),
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

    console.log(data);

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
