import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-shift',
  templateUrl: './select-shift.component.html',
  styleUrls: ['./select-shift.component.scss']
})
export class SelectShiftComponent {

  constructor(private attendanceApi: AttendanceApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  rosterShiftListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  openModal(){
    this.rosterShiftListData = [];
    this.getRosterShiftList();
    this.openButton.nativeElement.click();
  }

  getRosterShiftList(){
    this.isFetchingData = true;

    this.attendanceApi.getRosterShiftList()
      .then(
        (res: any) => {
          console.log(res);
          this.rosterShiftListData = res.docs;
          this.isFetchingData = false;

          if(res.docs.length == 0)
            this.isDataAvailable = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }
  
}
