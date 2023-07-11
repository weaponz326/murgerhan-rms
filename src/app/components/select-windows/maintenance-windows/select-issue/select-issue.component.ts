import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-issue',
  templateUrl: './select-issue.component.html',
  styleUrls: ['./select-issue.component.scss']
})
export class SelectIssueComponent {

  constructor(
    private maintenanceApi: MaintenanceApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  issueListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['issue_code', 'issue_date', 'issue_subject', 'system_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.issueListData = [];
    this.getIssueList();
    this.openButton.nativeElement.click();
  }

  getIssueList(){
    this.isFetchingData = true;

    this.maintenanceApi.getIssueList()
      .then(
        (res: any) => {
          // console.log(res);
          this.issueListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0)
            this.isDataAvailable = false;
          else
            this.currentPage = 1

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
    this.issueListData = this.aggregateTable.filterData(this.issueListData, this.filterText, this.tableColumns);
    this.issueListData = this.aggregateTable.sortData(this.issueListData, this.sortColumn, this.sortDirection);
    this.issueListData = this.aggregateTable.paginateData(this.issueListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "UE");
  }
  
}
