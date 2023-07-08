import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}
  
  basicData: any;
  invitationData: any;
  invitationEmail = "";
  InvitationId = "";

  isFetchingData = false;
  isSavingBasic = false;
  isUploadingFile = false;
  isFileUploaded = false;
  showPrompt = false;

  selectedFile: any;
  selectedFileName = "";
  termsAcceptanceStatus: boolean = false;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  
  ngOnInit(): void {
    this.getBasicProfile();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.uploadFile();
  }

  getBasicProfile() {
    this.isFetchingData = true;

    const id = localStorage.getItem('uid') as string;

    this.usersApi.getBasicUser(id)
      .then((res) => {
        // console.log(res);
        this.basicData = res;

        this.termsAcceptanceStatus = this.basicData.data().terms_acceptance_status;  
        this.invitationEmail = this.basicData.data().email;
        this.getInvitationWithEmail();
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  uploadFile() {
    this.isUploadingFile = true;

    const id = localStorage.getItem('uid') as string;

    if (this.selectedFile) {
      this.usersApi.uploadTermsFile(id, this.selectedFile)
        .then(() => {
          // console.log("file uploaded...");
          this.isUploadingFile = false;
          this.isFileUploaded = true;
        })
        .catch((error: any) => {
          console.error('Error uploading file:', error);
          this.isUploadingFile = false;
        });
    }
  }

  updateBasic() {
    this.isSavingBasic = true;
    
    const id = localStorage.getItem('uid') as string;
    let data = { terms_acceptance_status: true }

    this.usersApi.updateBasicUser(id, data)
      .then((res) => {
        // console.log(res);
        this.isSavingBasic = false;
        this.showPrompt = true;

        this.updateInvitation();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isSavingBasic = false;
      });
  }

  getInvitationWithEmail() {
    this.usersApi.getInvitationWithEmail(this.invitationEmail)
      .then((res) => {
        // console.log(res.docs[0]);
        this.invitationData = res.docs;
        this.isFetchingData = false;
      }),
      (err: any) => {
        // console.log(err);
      };
  }

  updateInvitation() {    
    const id = this.invitationData[0].id;
    let data = { 
      date_accepted: serverTimestamp(),
      invitation_status: "Accepted",
    };

    this.usersApi.updateInvitation(id, data)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
      });
  }
  
}
