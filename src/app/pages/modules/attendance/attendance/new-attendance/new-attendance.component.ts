import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Attendance } from 'src/app/models/modules/attendance/attendance.model';
import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.scss']
})
export class NewAttendanceComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService
  ) {}  
  
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isSavingAttendance = false;

  attendanceForm = new FormGroup({
    attendanceCode: new FormControl(''),
    attendanceName: new FormControl(''),
    fromDate: new FormControl(),
    toDate: new FormControl(),
  })

  openModal(){
    this.newButton.nativeElement.click();
  }

  createAttendance() {
    this.isSavingAttendance = true;

    let data: Attendance = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      attendance_code: this.attendanceForm.controls.attendanceCode.value as string,
      attendance_name: this.attendanceForm.controls.attendanceName.value as string,
      from_date: this.attendanceForm.controls.fromDate.value,
      to_date: this.attendanceForm.controls.toDate.value,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    console.log(data);

    this.attendanceApi.createAttendance(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          sessionStorage.setItem('attendance_attendance_id', res.id);
          this.router.navigateByUrl("/modules/attendance/attendance/general-attendance");
        }
        this.isSavingAttendance = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingAttendance = false;
      });
  }
  
}
