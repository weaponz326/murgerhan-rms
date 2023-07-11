import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-roster',
  templateUrl: './select-roster.component.html',
  styleUrls: ['./select-roster.component.scss']
})
export class SelectRosterComponent {

  constructor(
    private attendanceApi: AttendanceApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  rosterListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['roster_code', 'roster_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.rosterListData = [];
    this.getRosterList();
    this.openButton.nativeElement.click();
  }

  getRosterList(){
    this.isFetchingData = true;

    this.attendanceApi.getRosterList()
      .then(
        (res: any) => {
          // console.log(res);
          this.rosterListData = res.docs;
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
    this.rosterListData = this.aggregateTable.filterData(this.rosterListData, this.filterText, this.tableColumns);
    this.rosterListData = this.aggregateTable.sortData(this.rosterListData, this.sortColumn, this.sortDirection);
    this.rosterListData = this.aggregateTable.paginateData(this.rosterListData, this.currentPage, this.pageSize);
  }
 
  getFormatId(id: any){
    return this.formatId.formatId(id, 3, "#", "RT");
  }

}
