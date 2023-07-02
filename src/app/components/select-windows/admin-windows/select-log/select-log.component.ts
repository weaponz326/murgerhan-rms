import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-log',
  templateUrl: './select-log.component.html',
  styleUrls: ['./select-log.component.scss']
})
export class SelectLogComponent {

  constructor(private adminApi: AdminApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  logListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  openModal(){
    this.logListData = [];
    this.getLogList();
    this.openButton.nativeElement.click();
  }

  getLogList(){
    this.isFetchingData = true;

    this.adminApi.getLogList()
      .then(
        (res: any) => {
          console.log(res);
          this.logListData = res.docs;
          this.isFetchingData = false;          
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
