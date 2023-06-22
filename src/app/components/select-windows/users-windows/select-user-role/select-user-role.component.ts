import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-user-role',
  templateUrl: './select-user-role.component.html',
  styleUrls: ['./select-user-role.component.scss']
})
export class SelectUserRoleComponent {

  constructor(private usersApi: UsersApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  userListData: any[] = [];

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

  openModal(){
    this.userListData = [];
    this.getUserRoleList();
    this.openButton.nativeElement.click();
  }

  getUserRoleList(){
    this.isFetchingData = true;

    this.usersApi.getUserRoleList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.userListData = res.docs;
          this.isFetchingData = false;

          this.currentPageSize = res.docs.length;
          if(res.docs.length == 0)
            this.isDataAvailable = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getUserRoleList();
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
