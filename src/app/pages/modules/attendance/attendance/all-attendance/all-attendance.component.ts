import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { NewAttendanceComponent } from '../new-attendance/new-attendance.component';


@Component({
  selector: 'app-all-attendance',
  templateUrl: './all-attendance.component.html',
  styleUrls: ['./all-attendance.component.scss']
})
export class AllAttendanceComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('newAttendanceComponentReference', { read: NewAttendanceComponent, static: false }) newAttendance!: NewAttendanceComponent;
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
  pageSize = 25;

  ngOnInit(): void {
    this.getAttendanceList();
  }

  getAttendanceList(){
    this.isFetchingData = true;

    this.attendanceApi.getAttendanceList()
      .then(
        (res: any) => {
          // console.log(res);
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
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewAttendance(attendanceId: any){
    // console.log(attendanceId);

    sessionStorage.setItem("attendance_attendance_id", attendanceId);
    this.router.navigateByUrl("/modules/attendance/attendance/general-attendance");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.attendanceListData = this.aggregateTable.filterData(this.attendanceListData, this.filterText, this.tableColumns);
    this.attendanceListData = this.aggregateTable.sortData(this.attendanceListData, this.sortColumn, this.sortDirection);
    this.attendanceListData = this.aggregateTable.paginateData(this.attendanceListData, this.currentPage, this.pageSize);
  }
 
  getFormatId(id: any){
    return this.formatId.formatId(id, 3, "#", "AT");
  }

}
