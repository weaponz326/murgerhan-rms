import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Roster } from 'src/app/models/modules/attendance/attendance.model';
import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-roster',
  templateUrl: './view-roster.component.html',
  styleUrls: ['./view-roster.component.scss']
})
export class ViewRosterComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  rosterData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingRoster = false;
  isDeletingRoster = false;

  rosterForm = new FormGroup({
    rosterCode: new FormControl({value: '', disabled: true}),
    rosterName: new FormControl('', Validators.required),
    fromDate: new FormControl({value: null, disabled: true}, Validators.required),
    toDate: new FormControl({value: null, disabled: true}, Validators.required),
  })
  
  ngOnInit(): void {
    this.getRoster();
  }

  getRoster() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('attendance_roster_id') as string;

    this.attendanceApi.getRoster(id)
      .then((res) => {
        // console.log(res);
        this.rosterData = res;
        this.isFetchingData = false;
        this.setRosterData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateRoster() {    

    if(this.rosterForm.valid){
      this.isSavingRoster = true;
      
      let data = this.setUpdateRosterData();
      const id = sessionStorage.getItem('attendance_roster_id') as string;

      this.attendanceApi.updateRoster(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingRoster = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingRoster = false;
        });
    }
  }

  deleteRoster() {
    this.isDeletingRoster = true;

    const id = sessionStorage.getItem('attendance_roster_id') as string;

    this.attendanceApi.deleteRoster(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/attendance/roster/all-roster')
        this.isDeletingRoster = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingRoster = false;
      });
  }

  setRosterData(){
    this.rosterForm.controls.rosterCode.setValue(this.formatId.formatId(this.rosterData.data().roster_code, 3, "#", "RT"));
    this.rosterForm.controls.rosterName.setValue(this.rosterData.data().roster_name);
    this.rosterForm.controls.fromDate.setValue(this.rosterData.data().from_date);
    this.rosterForm.controls.toDate.setValue(this.rosterData.data().to_date);
  }

  setUpdateRosterData(){
    let data: Roster = {
      created_at: this.rosterData.data().created_at,
      updated_at: serverTimestamp(),
      roster_code: this.rosterData.data().roster_code,
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

  confirmDelete(){
    this.deleteModal.openModal();
  }

}
