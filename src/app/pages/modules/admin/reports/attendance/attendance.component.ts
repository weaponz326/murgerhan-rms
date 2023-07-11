import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { AttendancePrintService } from 'src/app/services/modules-print/attendance-print/attendance-print.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
    private attendancePrint: AttendancePrintService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  modules = ["Attendance"];
  
  selectedModule = "";
  startDate: any;
  endDate: any;

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  attendanceSheetListData: any;

  numberPresent = 0;
  numberAbsent = 0;

  ngOnInit(): void {
    this.getBranchAttendanceSheetList();
  }

  getBranchAttendanceSheetList() {
    this.attendanceApi.getBranchAttendanceSheetList()
      .then((res) => {
        // console.log(res.docs);
        this.attendanceSheetListData = res.docs;

        this.getMetrics();
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
      };
  }

  getMetrics(){
    this.numberPresent = this.attendanceSheetListData
      .filter((obj: any) => {
        return (
          this.startDate.toDateString() >= this.endDate.toDateString() &&
          obj.data().clocked_in != null
        );
      }).length;

    this.numberAbsent = this.attendanceSheetListData
      .filter((obj: any) => {
        return (
          this.startDate.toDateString() >= this.endDate.toDateString() &&
          obj.data().clocked_in == null
        );
      }).length;
  }

  onPrint(){
    // console.log("lets start printing...");

    let dates = { 'startDate' : this.startDate, 'endDate' : this.endDate }
    let metrics = {
      'numberPresent' : this.numberPresent,
      'numberAbsent' : this.numberAbsent,
    }

    this.attendancePrint.printAttendanceReport(metrics, dates);
  }

}
