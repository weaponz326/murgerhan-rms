import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-attendance',
  templateUrl: './select-attendance.component.html',
  styleUrls: ['./select-attendance.component.scss']
})
export class SelectAttendanceComponent {

  constructor(
    private attendanceApi: AttendanceApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  attendanceListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['attendance_code', 'attendance_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.attendanceListData = [];
    this.getAttendanceList();
    this.openButton.nativeElement.click();
  }

  getAttendanceList(){
    this.isFetchingData = true;

    this.attendanceApi.getAttendanceList()
      .then(
        (res: any) => {
          console.log(res);
          this.attendanceListData = res.docs;
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
    this.attendanceListData = this.aggregateTable.filterData(this.attendanceListData, this.filterText, this.tableColumns);
    this.attendanceListData = this.aggregateTable.sortData(this.attendanceListData, this.sortColumn, this.sortDirection);
    this.attendanceListData = this.aggregateTable.paginateData(this.attendanceListData, this.currentPage, this.pageSize);
  }

}
