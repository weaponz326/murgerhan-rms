import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { UserRole } from 'src/app/models/modules/users/users.model';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


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
  basicUserData: any;
  invitationEmail = "";

  termsFile = "#";

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

        this.invitationEmail = this.invitationData.data().invitee_email;
        this.getBasicuserWithEmail();
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  getBasicuserWithEmail() {
    this.usersApi.getBasicUserWithEmail(this.invitationEmail)
      .then((res) => {
        console.log(res);
        this.basicUserData = res.docs[0];
        this.termsFile = this.basicUserData.data().terms_file;
        this.isFetchingData = false;
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateInvitation() {
    this.isSavingInvitation = true;
    
    const id = sessionStorage.getItem('users_invitation_id') as string;
    let data = { invitation_status: "Approved" };

    this.usersApi.updateInvitation(id, data)
      .then((res) => {
        console.log(res);
        this.setUserRole();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingInvitation = false;
      });
  }

  setUserRole() {
    let id = this.basicUserData.id;

    let data: UserRole = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      full_name: "",
      staff_code: "",
      staff_role: "",
      branch: {
        id: "",
        data: {
            branch_name: "",
            location: "",
        }
      }
    }

    this.usersApi.setUserRole(id, data)
      .then((res: any) => {
        console.log(res);
        sessionStorage.setItem('users_user_id', id);
        this.router.navigateByUrl("/modules/users/users/view-user");

        this.isSavingInvitation = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingInvitation = false;
      });
  }
  
}
