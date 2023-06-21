import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-roster',
  templateUrl: './select-roster.component.html',
  styleUrls: ['./select-roster.component.scss']
})
export class SelectRosterComponent {

  constructor(private attendanceApi: AttendanceApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  rosterListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPageSize = 0;
  currentPageNumber = 0;
  defaultPageSize = 25;
  sorting = {
    created_at: "desc",
    log_code: "",
    user: "",
    activity: ""
  };
  querying = {
    created_at: "",
    log_code: "",
    user: "",
    activity: ""
  }

  openModal(){
    this.rosterListData = [];
    this.getRosterList();
    this.openButton.nativeElement.click();
  }

  getRosterList(){
    this.isFetchingData = true;

    this.attendanceApi.getRosterList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.rosterListData = res.docs;
          this.isFetchingData = false;

          this.currentPageSize = res.docs.length;
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

  changePage(page: any){
    this.currentPageNumber = page;
    this.getRosterList();
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }
  
}
