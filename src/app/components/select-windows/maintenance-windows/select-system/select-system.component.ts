import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-system',
  templateUrl: './select-system.component.html',
  styleUrls: ['./select-system.component.scss']
})
export class SelectSystemComponent {

  constructor(
    private maintenanceApi: MaintenanceApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  systemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['system_code', 'system_name', 'system_type'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.systemListData = [];
    this.getSystemList();
    this.openButton.nativeElement.click();
  }

  getSystemList(){
    this.isFetchingData = true;

    this.maintenanceApi.getSystemList()
      .then(
        (res: any) => {
          console.log(res);
          this.systemListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0)
            this.isDataAvailable = false;
          else
            this.currentPage = 1

          this.aggregateData();
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

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.systemListData = this.aggregateTable.filterData(this.systemListData, this.filterText, this.tableColumns);
    this.systemListData = this.aggregateTable.sortData(this.systemListData, this.sortColumn, this.sortDirection);
    this.systemListData = this.aggregateTable.paginateData(this.systemListData, this.currentPage, this.pageSize);
  }
  
}
