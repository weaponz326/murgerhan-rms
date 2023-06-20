import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Roster } from 'src/app/models/modules/attendance/attendance.model';
import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-new-roster',
  templateUrl: './new-roster.component.html',
  styleUrls: ['./new-roster.component.scss']
})
export class NewRosterComponent {
    
  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService
  ) {}  
  
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  
  selectedBranchData: any;
  
  isSavingRoster = false;

  rosterForm = new FormGroup({
    rosterCode: new FormControl(''),
    rosterName: new FormControl(''),
    fromDate: new FormControl(),
    toDate: new FormControl(),
  })

  openModal(){
    this.newButton.nativeElement.click();
  }

  createRoster() {
    this.isSavingRoster = true;

    let data: Roster = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      roster_code: this.rosterForm.controls.rosterCode.value as string,
      roster_name: this.rosterForm.controls.rosterName.value as string,
      from_date: this.rosterForm.controls.fromDate.value,
      to_date: this.rosterForm.controls.toDate.value,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    console.log(data);

    this.attendanceApi.createRoster(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          sessionStorage.setItem('attendance_roster_id', res.id);
          this.router.navigateByUrl("/modules/attendance/roster/view-roster");
        }
        this.isSavingRoster = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingRoster = false;
      });
  }
  
}
