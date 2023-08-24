import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Roster } from 'src/app/models/modules/attendance/attendance.model';
import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { AttendancePrintService } from 'src/app/services/modules-print/attendance-print/attendance-print.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';

import { ManagePersonnelComponent } from '../manage-personnel/manage-personnel.component';
import { AddBatchComponent } from '../add-batch/add-batch.component';
import { EditBatchComponent } from '../edit-batch/edit-batch.component';

@Component({
  selector: 'app-manage-batches',
  templateUrl: './manage-batches.component.html',
  styleUrls: ['./manage-batches.component.scss']
})
export class ManageBatchesComponent {
  
  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
    private attendancePrint: AttendancePrintService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('managePersonnelComponentReference', { read: ManagePersonnelComponent, static: false }) managePersonnel!: ManagePersonnelComponent;
  @ViewChild('addBatchComponentReference', { read: AddBatchComponent, static: false }) addBatch!: AddBatchComponent;
  @ViewChild('editBatchComponentReference', { read: EditBatchComponent, static: false }) editBatch!: EditBatchComponent;

  rosterData: any;
  rosterBatchListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  rosterForm = new FormGroup({
    rosterCode: new FormControl({value: '', disabled: true}),
    rosterName: new FormControl({value: '', disabled: true}),
  })
  
  ngOnInit(): void {
    this.getRoster();
    this.getRosterBatchList();
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

  setRosterData(){
    this.rosterForm.controls.rosterCode.setValue(this.formatId.formatId(this.rosterData.data().roster_code, 3, "#", "RT"));
    this.rosterForm.controls.rosterName.setValue(this.rosterData.data().roster_name);
  }

  getRosterBatchList(){
    this.isFetchingData = true;

    this.attendanceApi.getRosterBatchList()
      .then(
        (res: any) => {
          // console.log(res);
          this.rosterBatchListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createRosterBatch(data: any) {
    this.addBatch.isItemSaving = true;

    // console.log(data);

    this.attendanceApi.createRosterBatch(data)
      .then((res: any) => {
        // console.log(res);

        if(res.id){
          this.getRosterBatchList();

          this.addBatch.isItemSaving = false;
          this.addBatch.dismissButton.nativeElement.click();
          this.addBatch.resetForm();
        }
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.addBatch.isItemSaving = false;
      });
  }

  updateRosterBatch(rosterbatch_item: any) {
    this.editBatch.isItemSaving = true;
    
    const id = sessionStorage.getItem('attendance_rosterbatch_id') as string;

    this.attendanceApi.updateRosterBatch(rosterbatch_item.id, rosterbatch_item.data)
      .then((res) => {
        // console.log(res);
        this.editBatch.isItemSaving = false;
        this.editBatch.dismissButton.nativeElement.click();
        this.getRosterBatchList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.editBatch.isItemSaving = false;
      });
  }

  deleteRosterBatch() {
    this.isItemDeleting = true;

    this.attendanceApi.deleteRosterBatch(this.deleteId)
      .then((res) => {
        // console.log(res);
        this.isItemDeleting = false;
        this.getRosterBatchList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  openEditItem(data: any){
    // console.log(data);
    this.editBatch.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  onPrint(){
    // console.log("lets print!.......");
    this.attendancePrint.printRosterBatches();
  }

}
