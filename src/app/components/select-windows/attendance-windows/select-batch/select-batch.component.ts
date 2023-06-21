import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-batch',
  templateUrl: './select-batch.component.html',
  styleUrls: ['./select-batch.component.scss']
})
export class SelectBatchComponent {

  constructor(private attendanceApi: AttendanceApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  rosterBatchListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  openModal(){
    this.rosterBatchListData = [];
    this.getRosterBatchList();
    this.openButton.nativeElement.click();
  }

  getRosterBatchList(){
    this.isFetchingData = true;

    this.attendanceApi.getRosterBatchList()
      .then(
        (res: any) => {
          console.log(res);
          this.rosterBatchListData = res.docs;
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
