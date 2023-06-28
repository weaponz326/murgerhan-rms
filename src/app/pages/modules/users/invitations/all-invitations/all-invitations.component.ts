import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

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
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('inviteUserComponentReference', { read: InviteUserComponent, static: false }) inviteUser!: InviteUserComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  invitationListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['invition_code', 'invitation_date', 'invitee_name', 'invitee_email', 'invitation_status'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  ngOnInit(): void {
    this.getInvitationList();
  }

  getInvitationList(){
    this.isFetchingData = true;

    this.usersApi.getInvitationList()
      .then(
        (res: any) => {
          console.log(res);
          this.invitationListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0)
            this.isDataAvailable = false;
          else
            this.currentPage = 1

          this.aggregateData();
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

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.invitationListData = this.aggregateTable.filterData(this.invitationListData, this.filterText, this.tableColumns);
    this.invitationListData = this.aggregateTable.sortData(this.invitationListData, this.sortColumn, this.sortDirection);
    this.invitationListData = this.aggregateTable.paginateData(this.invitationListData, this.currentPage, this.pageSize);
  }

}
