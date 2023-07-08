import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-day-attendance-sheet',
  templateUrl: './day-attendance-sheet.component.html',
  styleUrls: ['./day-attendance-sheet.component.scss']
})
export class DayAttendanceSheetComponent {

  constructor(
    private attendanceApi: AttendanceApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  personnelListData:any;
  sheetListData: any;

  isFetchingData = false;

  ngOnInit(): void {
    this.getAttendancePersonnelList();
  }

  getAttendancePersonnelList(){
    this.isFetchingData = true;

    this.attendanceApi.getAttendancePersonnelList()
      .then(
        (res: any) => {
          // console.log(res.docs);
          this.personnelListData = res.docs;
          this.isFetchingData = false;   
          
          this.getDayAttendanceSheetList();        
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getDayAttendanceSheetList() {
    this.isFetchingData = true;

    this.attendanceApi.getDayAttendanceSheetList()
      .then((res) => {
        // console.log(res.docs);
        this.sheetListData = res.docs;
        this.isFetchingData = false;
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

}
