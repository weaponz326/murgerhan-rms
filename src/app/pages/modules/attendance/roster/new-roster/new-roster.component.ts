import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Roster } from 'src/app/models/modules/attendance/attendance.model';
import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-new-roster',
  templateUrl: './new-roster.component.html',
  styleUrls: ['./new-roster.component.scss']
})
export class NewRosterComponent {
    
  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
    private formatId: FormatIdService
  ) {}  
  
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isFetchingData = false;
  isSavingRoster = false;
  isSaved = false;

  thisId = 0;
  
  rosterForm = new FormGroup({
    rosterCode: new FormControl({value: '', disabled: true}),
    rosterName: new FormControl('', Validators.required),
    fromDate: new FormControl(new Date().toISOString().slice(0, 10), Validators.required),
    toDate: new FormControl(new Date().toISOString().slice(0, 10), Validators.required),
  })

  openModal(){
    this.newButton.nativeElement.click();
    this.getLastRoster();
  }

  getLastRoster(){
    this.isFetchingData = true;

    this.attendanceApi.getLastRoster()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.roster_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.rosterForm.controls.rosterCode.setValue(this.formatId.formatId(this.thisId, 3, "#", "RT"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createRoster() {
    this.isSaved = true;
    
    if(this.rosterForm.valid){
      this.isSavingRoster = true;

      let data = this.setCreateRosterData();

      this.attendanceApi.createRoster(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('attendance_roster_id', res.id);
            this.router.navigateByUrl("/modules/attendance/roster/view-roster");
          }

          this.dismissButton.nativeElement.click();
          this.isSavingRoster = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingRoster = false;
        });
    }
  }

  setCreateRosterData(){
    let data: Roster = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      roster_code: this.thisId,
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

    // console.log(data);
    return data;
  }
  
}
