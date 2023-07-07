import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-user-attendance-sheet',
  templateUrl: './user-attendance-sheet.component.html',
  styleUrls: ['./user-attendance-sheet.component.scss']
})
export class UserAttendanceSheetComponent {

  constructor(
    private attendanceApi: AttendanceApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  sheetListData: any;

  isFetchingData = false;

  ngOnInit(): void {
    this.getUserAttendanceSheetList();
  }

  getUserAttendanceSheetList() {
    this.isFetchingData = true;

    this.attendanceApi.getUserAttendanceSheetList()
      .then((res) => {
        console.log(res);
        this.sheetListData = res.docs;
        this.isFetchingData = false;
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  dateFormat(date: any){
    let transformedDate = new Date(date.toDate());
    return formatDate(transformedDate, 'yyyy-MM-dd', 'en-US');
  }

}
