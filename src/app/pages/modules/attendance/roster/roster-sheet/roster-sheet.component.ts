import { Component, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { RosterSheet } from 'src/app/models/modules/attendance/attendance.model';

import { SelectBatchComponent } from 'src/app/components/select-windows/attendance-windows/select-batch/select-batch.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-roster-sheet',
  templateUrl: './roster-sheet.component.html',
  styleUrls: ['./roster-sheet.component.scss']
})
export class RosterSheetComponent {

  constructor(
    private attendanceApi: AttendanceApiService
  ) {}

  @ViewChild('selectBatchComponentReference', { read: SelectBatchComponent, static: false }) selectBatch!: SelectBatchComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  sheetDates: Date[] = [];

  rosterData: any;
  rosterShiftListData: any;
  rosterSheetListData: any;

  selectedBatchId: any;
  selectedBatchData: any;
  selectedShiftId: any;
  selectedDate: any;
  selectedSheetId: any;

  isSavingSheet = false;
  isFetchingData = false;

  ngOnInit(): void {
    this.getRoster();
    this.getRosterShiftList();
  }

  getRoster() {
    const id = sessionStorage.getItem('attendance_roster_id') as string;

    this.attendanceApi.getRoster(id)
      .then((res) => {
        // console.log(res);
        this.rosterData = res;
        this.getDateRange(new Date(this.rosterData.data().from_date), new Date(this.rosterData.data().to_date));
        this.getRosterSheetList();
      }),
      (err: any) => {
        // console.log(err);
      };
  }  

  getRosterShiftList(){
    this.attendanceApi.getRosterShiftList()
      .then(
        (res: any) => {
          // console.log(res);
          this.rosterShiftListData = res.docs;

          this.getRosterSheetList();
        },
        (err: any) => {
          // console.log(err);
        }
      )
  }

  getRosterSheetList(){
    this.attendanceApi.getRosterSheetList()
      .then(
        (res: any) => {
          // console.log(res);
          this.rosterSheetListData = res.docs;
        },
        (err: any) => {
          // console.log(err);
        }
      )
  }

  createRosterSheet() {
    this.isSavingSheet = true;

    let data: RosterSheet = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      roster: sessionStorage.getItem("attendance_roster_id") as string,
      shift: this.selectedShiftId,
      date: this.selectedDate,
      batch: {
        id: this.selectedBatchId,
        data: {
          batch_name: this.selectedBatchData.batch_name,
          batch_symbol: this.selectedBatchData.batch_symbol,
        }
      }
    }

    // console.log(data);

    this.attendanceApi.createRosterSheet(data)
      .then((res: any) => {
        // console.log(res);
        this.isSavingSheet = false;

        this.getRosterSheetList();
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isSavingSheet = false;
      });
  }

  updateRosterSheet() {
    this.isSavingSheet = true;

    let data: RosterSheet = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      roster: sessionStorage.getItem("attendance_roster_id") as string,
      shift: this.selectedShiftId,
      date: this.selectedDate,
      batch: {
        id: this.selectedBatchId,
        data: {
          batch_name: this.selectedBatchData.batch_name,
          batch_symbol: this.selectedBatchData.batch_symbol,
        }
      }
    }

    // console.log(this.selectedSheetId, data);

    this.attendanceApi.updateRosterSheet(this.selectedSheetId ,data)
      .then((res: any) => {
        // console.log(res);
        this.isSavingSheet = false;
        this.selectedSheetId = null;

        this.getRosterSheetList();
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isSavingSheet = false;
      });
  }

  getDateRange(startDate: Date, endDate: Date) {
    this.sheetDates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      this.sheetDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  refereshSheet(){
    this.getRoster();
    this.getRosterShiftList();
  }

  saveSheet(shiftId: any, date: any, sheetId: any){
    this.selectedShiftId = shiftId;
    this.selectedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    if(sheetId) 
      this.selectedSheetId = sheetId;

    // console.log(this.selectedSheetId);
    
    this.openBatchWindow();
  }

  openBatchWindow(){
    // console.log("You are opening select batch window")
    this.selectBatch.openModal();
  }

  onBatchSelected(batchData: any){
    // console.log(batchData);
    this.selectedBatchId = batchData.id;
    this.selectedBatchData = batchData.data();

    if (this.selectedSheetId){
      // console.log('we are updating yo yoo yo yoo...');
      this.updateRosterSheet();
    }
    else{
      // console.log('we are creating yo yoo yo yoo...');
      this.createRosterSheet();
    }
  }

  dateFormat(date: any){
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
  
}
