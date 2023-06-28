import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  userListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['staff_code', 'full_name', 'branch_name', 'staff_role'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  ngOnInit(): void {
    this.getUserRoleList();
  }

  getUserRoleList(){
    this.isFetchingData = true;

    this.usersApi.getUserRoleList()
      .then(
        (res: any) => {
          console.log(res.docs);
          this.userListData = res.docs;
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

  viewUserDetails(userId: any){
    console.log(userId);

    sessionStorage.setItem("users_user_id", userId);
    this.router.navigateByUrl("/modules/users/users/view-user");
  }

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.userListData = this.aggregateTable.filterData(this.userListData, this.filterText, this.tableColumns);
    this.userListData = this.aggregateTable.sortData(this.userListData, this.sortColumn, this.sortDirection);
    this.userListData = this.aggregateTable.paginateData(this.userListData, this.currentPage, this.pageSize);
  }
  
}
