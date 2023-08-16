import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { InvitationsConfiguration } from 'src/app/models/modules/users/users.model';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-invitation-configuration',
  templateUrl: './invitation-configuration.component.html',
  styleUrls: ['./invitation-configuration.component.scss']
})
export class InvitationConfigurationComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService,
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  
  isFetchingData = false;
  isSavingConfiguration = false;
  isSaved = false;

  configurationData: any;

  isUploadingFile = false;
  isFileUploaded = false;
  showPrompt = false;

  selectedFile: any;
  selectedFileName = "";
  fileUrl: any;

  configurationForm = new FormGroup({
    staffEmailSubject: new FormControl(),
    staffEmailMessage: new FormControl(),
    thirdPartyEmailSubject: new FormControl(),
    thirdPartyEmailMessage: new FormControl(),
  })

  ngOnInit(): void {
    this.getConfiguration();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.uploadFile();
  }

  getConfiguration() {
    this.isFetchingData = true;

    this.usersApi.getInvitationConfiguration()
      .then((res) => {
        // console.log(res);
        this.configurationData = res.docs[0];
        this.isFetchingData = false;
        this.setConfigurationData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateInvitationConfiguration() {
    this.isSaved = true;
    
    if(this.configurationForm.valid){
      this.isSavingConfiguration = true;
      
      const id = this.configurationData.id;
      let data = this.setUpdateConfigurationData();

      this.usersApi.updateInvitationConfiguration(id, data)
        .then((res: any) => {
          // console.log(res);
          this.isSavingConfiguration = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingConfiguration = false;
        });
    }
  }

  uploadFile() {
    this.isUploadingFile = true;

    const id = this.configurationData.id;

    if (this.selectedFile) {
      this.usersApi.uploadConfigurationTermsFile(id, this.selectedFile)
        .then(() => {
          // console.log("file uploaded...");
          this.isUploadingFile = false;
          this.isFileUploaded = true;
          this.getConfiguration();
        })
        .catch((error: any) => {
          // console.error('Error uploading file:', error);
          this.isUploadingFile = false;
        });
    }
  }

  setConfigurationData(){
    this.configurationForm.controls.staffEmailSubject.setValue(this.configurationData.data().staff_email_subject);
    this.configurationForm.controls.staffEmailMessage.setValue(this.configurationData.data().staff_email_message);
    this.configurationForm.controls.thirdPartyEmailSubject.setValue(this.configurationData.data().third_party_email_subject);
    this.configurationForm.controls.thirdPartyEmailMessage.setValue(this.configurationData.data().third_party_email_message);

    this.fileUrl = this.configurationData.data().terms_file_url;
  }

  setUpdateConfigurationData(){
    let data: InvitationsConfiguration = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      staff_email_subject: this.configurationForm.controls.staffEmailSubject.value as string,
      staff_email_message: this.configurationForm.controls.staffEmailMessage.value as string,
      third_party_email_subject: this.configurationForm.controls.thirdPartyEmailSubject.value as string,
      third_party_email_message: this.configurationForm.controls.thirdPartyEmailMessage.value as string,
      terms_file_url: this.configurationData.data().terms_file_url
    }

    // console.log(data);
    return data;
  }

}
