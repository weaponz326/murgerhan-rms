import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

@Component({
  selector: 'app-view-invitation',
  templateUrl: './view-invitation.component.html',
  styleUrls: ['./view-invitation.component.scss']
})
export class ViewInvitationComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  invitationData: any;

  isFetchingData = false;
  isSavingInvitation = false;

  ngOnInit(): void {
    this.getInvitation();
  }

  getInvitation() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('users_invitation_id') as string;

    this.usersApi.getInvitation(id)
      .then((res) => {
        console.log(res);
        this.invitationData = res;
        this.isFetchingData = false;
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateInvitation(invitaionStatus: any) {
    this.isSavingInvitation = true;
    
    const id = sessionStorage.getItem('users_invitation_id') as string;
    let data = { invitation_status: invitaionStatus };

    this.usersApi.updateInvitation(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingInvitation = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingInvitation = false;
      });
  }
  
}
