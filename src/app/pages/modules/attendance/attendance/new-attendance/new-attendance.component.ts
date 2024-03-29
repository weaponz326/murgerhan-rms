import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Attendance } from 'src/app/models/modules/attendance/attendance.model';
import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';


@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.scss']
})
export class NewAttendanceComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
    private usersApi: UsersApiService,
    private formatId: FormatIdService
  ) {}  
  
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  userListData: any;

  isFetchingData = false;
  isSavingAttendance = false;
  isSaved = false;

  thisId = 0;

  attendanceForm = new FormGroup({
    attendanceCode: new FormControl({value: '', disabled: true}),
    attendanceName: new FormControl('', Validators.required),
    fromDate: new FormControl(new Date().toISOString().slice(0, 10), Validators.required),
    toDate: new FormControl(new Date().toISOString().slice(0, 10), Validators.required),
  })

  openModal(){
    this.newButton.nativeElement.click();
    this.getBranchUserRoleList();
    this.getLastAttendance();
  }

  getLastAttendance(){
    this.isFetchingData = true;

    this.attendanceApi.getLastAttendance()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.attendance_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.attendanceForm.controls.attendanceCode.setValue(this.formatId.formatId(this.thisId, 3, "#", "AT"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getBranchUserRoleList(){
    this.usersApi.getBranchUserRoleList()
      .then(
        (res: any) => {
          // console.log(res.docs);
          this.userListData = res.docs;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
        }
      )
  }

  createAttendance() {
    this.isSaved = true;

    if(this.attendanceForm.valid){
      this.isSavingAttendance = true;
      
      let data = this.setCreateAttendanceData()

      this.attendanceApi.createAttendance(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('attendance_attendance_id', res.id);
            // this.router.navigateByUrl("/modules/attendance/attendance/general-attendance");        
            this.setPersonnelData();
            this.createAttendancePersonnelBatch();
          }

          this.dismissButton.nativeElement.click();
          this.isSavingAttendance = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingAttendance = false;
        });
    }
  }

  createAttendancePersonnelBatch(){
    this.attendanceApi.createAttendancePersonnelBatch(this.userListData)
      .then(() => {
        // console.log('Batch operation completed successfully!');
        this.router.navigateByUrl("/modules/attendance/attendance/general-attendance");
        this.dismissButton.nativeElement.click();
        this.isSavingAttendance = false;
      })
      .catch((error) => {
        console.error('Error performing batch operation:', error);
        this.isSavingAttendance = false;
      });
  }

  setCreateAttendanceData(){
    let data: Attendance = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      attendance_code: this.thisId,
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

    // console.log(data);
    return data;
  }

  setPersonnelData(){
    this.userListData = this.userListData.map((item: any) => {
      return {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        attendance: sessionStorage.getItem('attendance_attendance_id'),
        personnel: {
          id: item.id,
          data: {
            staff_code: item.data().staff_code,
            full_name: item.data().full_name,
            staff_role: item.data().staff_role,
          }
        }
      };
    });
  }
  
}
