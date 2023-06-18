import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { InviteUserComponent } from '../invite-user/invite-user.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-invitations',
  templateUrl: './all-invitations.component.html',
  styleUrls: ['./all-invitations.component.scss']
})
export class AllInvitationsComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService,
  ) { }

  @ViewChild('inviteUserComponentReference', { read: InviteUserComponent, static: false }) inviteUser!: InviteUserComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  invitationListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPageSize = 0;
  currentPageNumber = 0;
  defaultPageSize = 25;
  sorting = {
    created_at: "desc",
    log_code: "",
    user: "",
    activity: ""
  };
  querying = {
    created_at: "",
    log_code: "",
    user: "",
    activity: ""
  }

  ngOnInit(): void {
    this.getInvitationList();
  }

  getInvitationList(){
    this.isFetchingData = true;

    this.usersApi.getInvitationList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.invitationListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewInvitation(invitationId: any){
    console.log(invitationId);

    sessionStorage.setItem("users_invitation_id", invitationId);
    this.router.navigateByUrl("/modules/users/invitations/view-invitation");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getInvitationList();
  }

}
