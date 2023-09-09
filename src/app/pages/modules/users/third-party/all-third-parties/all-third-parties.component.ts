import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-third-parties',
  templateUrl: './all-third-parties.component.html',
  styleUrls: ['./all-third-parties.component.scss']
})
export class AllThirdPartiesComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  userListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['user_code', 'full_name', 'company_type', 'company_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 15;

  ngOnInit(): void {
    this.getThirdPartyRoleList();
  }

  getThirdPartyRoleList(){
    this.isFetchingData = true;

    this.usersApi.getThirdPartyRoleList()
      .then(
        (res: any) => {
          // console.log(res.docs);
          this.userListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.currentPage = 0;
            this.isDataAvailable = false;
          }

          this.aggregateData();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewUserDetails(userId: any){
    // console.log(userId);

    sessionStorage.setItem("users_third_party_id", userId);
    this.router.navigateByUrl("/modules/users/third-party/view-third-party");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.userListData = this.aggregateTable.filterData(this.userListData, this.filterText, this.tableColumns);
    this.userListData = this.aggregateTable.sortData(this.userListData, this.sortColumn, this.sortDirection);
    this.userListData = this.aggregateTable.paginateData(this.userListData, this.currentPage, this.pageSize);
  }
  
}
