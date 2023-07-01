import { Component, ViewChild } from '@angular/core';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { IssueImage } from 'src/app/models/modules/maintenance/maintenance.model';
import { serverTimestamp } from 'firebase/firestore';


@Component({
  selector: 'app-issue-images',
  templateUrl: './issue-images.component.html',
  styleUrls: ['./issue-images.component.scss']
})
export class IssueImagesComponent {

  constructor(
    private maintenanceApi: MaintenanceApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  selectedFiles: File[] = [];
  issueImageListData: any;

  ngOnInit(): void {
    this.getIssueImageList();
  }

  onFileSelected(e: any): void {
    this.selectedFiles = Array.from(e.target.files);
    this.uploadIssueImage();
  }

  uploadIssueImage() {
    const data = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      issue: sessionStorage.getItem('maintenance_issue_id') as string,
    };

    this.maintenanceApi.uploadIssueImage(this.selectedFiles, data)
      .then(() => {
        console.log('Images uploaded successfully');
        // Reset the selected files array
        this.selectedFiles = [];
        this.getIssueImageList();
      })
      .catch((error) => {
        console.error('Error uploading images', error);
      });
  }

  getIssueImageList(){
    this.maintenanceApi.getIssueImageList()
      .then(
        (res: any) => {
          console.log(res);
          this.issueImageListData = res.docs;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      )
  }
  
}