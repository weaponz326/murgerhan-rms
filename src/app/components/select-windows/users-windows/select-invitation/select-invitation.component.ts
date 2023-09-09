import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-invitation',
  templateUrl: './select-invitation.component.html',
  styleUrls: ['./select-invitation.component.scss']
})
export class SelectInvitationComponent {

  constructor(
    private usersApi: UsersApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  invitationListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['invition_code', 'invitation_date', 'invitee_name', 'invitation_status'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.invitationListData = [];
    this.getInvitationList();
    this.openButton.nativeElement.click();
  }

  getInvitationList(){
    this.isFetchingData = true;

    this.usersApi.getInvitationList()
      .then(
        (res: any) => {
          // console.log(res);
          this.invitationListData = res.docs;
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

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    // console.log(row);
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.invitationListData = this.aggregateTable.filterData(this.invitationListData, this.filterText, this.tableColumns);
    this.invitationListData = this.aggregateTable.sortData(this.invitationListData, this.sortColumn, this.sortDirection);
    this.invitationListData = this.aggregateTable.paginateData(this.invitationListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "NV");
  }
  
}
