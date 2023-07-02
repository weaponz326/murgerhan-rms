import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-user-role',
  templateUrl: './select-user-role.component.html',
  styleUrls: ['./select-user-role.component.scss']
})
export class SelectUserRoleComponent {

  constructor(
    private usersApi: UsersApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

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
  pageSize = 10;

  openModal(){
    this.userListData = [];
    this.getUserRoleList();
    this.openButton.nativeElement.click();
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

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.userListData = this.aggregateTable.filterData(this.userListData, this.filterText, this.tableColumns);
    this.userListData = this.aggregateTable.sortData(this.userListData, this.sortColumn, this.sortDirection);
    this.userListData = this.aggregateTable.paginateData(this.userListData, this.currentPage, this.pageSize);
  }

}
