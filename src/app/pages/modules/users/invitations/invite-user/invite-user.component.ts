import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Invitation } from 'src/app/models/modules/users/users.model';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  
  isFetchingData = false;
  isSavingInvitation = false;
  isSaved = false;

  thisId = 0;

  defaultEmailSubject = "Invitation to Murger Han Hub";
  defaultEmailMessage = "Thank you for expressing your interest in being a staff at Murger Han. We would like to invite you to visit our operations website to register with us.";

  invitationForm = new FormGroup({
    invitationCode: new FormControl({value: '', disabled: true}),
    inviteeName: new FormControl('', Validators.required),
    inviteeEmail: new FormControl('', [Validators.required, Validators.email]),
    emailSubject: new FormControl(this.defaultEmailSubject),
    emailMessage: new FormControl(this.defaultEmailMessage),
  })

  openModal(){
    this.newButton.nativeElement.click();
    this.getLastInvitation();
  }

  getLastInvitation(){
    this.isFetchingData = true;

    this.usersApi.getLastInvitation()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.invitation_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.invitationForm.controls.invitationCode.setValue(this.formatId.formatId(this.thisId, 4, "#", "NV"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createInvitation() {
    this.isSaved = true;

    let data: Invitation = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      invitation_code: this.thisId,
      invitation_date: serverTimestamp(),
      invitee_name: this.invitationForm.controls.inviteeName.value as string,
      invitee_email: this.invitationForm.controls.inviteeEmail.value as string,
      date_accepted: null,
      invitation_status: "Awaiting",
      email_subject: this.invitationForm.controls.emailSubject.value as string,
      email_message: this.invitationForm.controls.emailMessage.value as string,
    }

    // console.log(data);

    if(this.invitationForm.valid){
      this.isSavingInvitation = true;

      this.usersApi.createInvitation(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('users_invitation_id', res.id);
            this.router.navigateByUrl("/modules/users/invitations/view-invitation");
          }

          this.dismissButton.nativeElement.click();
          this.isSavingInvitation = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingInvitation = false;
        });
    }
  }

}
