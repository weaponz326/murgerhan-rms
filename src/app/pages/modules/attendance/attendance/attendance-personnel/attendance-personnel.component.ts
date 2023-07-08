import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-attendance-personnel',
  templateUrl: './attendance-personnel.component.html',
  styleUrls: ['./attendance-personnel.component.scss']
})
export class AttendancePersonnelComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  attendanceData: any;
  attendancePersonnelData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isDataAvailable = false;

  attendanceForm = new FormGroup({
    attendanceCode: new FormControl({value: '', disabled: true}),
    attendanceName: new FormControl({value: '', disabled: true}),
  })
  
  ngOnInit(): void {
    this.getAttendance();
    this.getAttendancePersonnelList();
  }

  getAttendance() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('attendance_attendance_id') as string;

    this.attendanceApi.getAttendance(id)
      .then((res) => {
        // console.log(res);
        this.attendanceData = res;
        this.isFetchingData = false;
        this.setAttendanceData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  getAttendancePersonnelList(){
    this.isFetchingData = true;

    this.attendanceApi.getAttendancePersonnelList()
      .then(
        (res: any) => {
          // console.log(res);
          this.attendancePersonnelData = res.docs;
          this.isFetchingData = false;

          if(res.docs == 0)
            this.isDataAvailable = false;
          else
            this.isDataAvailable = true;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  setAttendanceData(){
    this.attendanceForm.controls.attendanceCode.setValue(this.attendanceData.data().attendance_code);
    this.attendanceForm.controls.attendanceName.setValue(this.attendanceData.data().attendance_name);
  }

}
