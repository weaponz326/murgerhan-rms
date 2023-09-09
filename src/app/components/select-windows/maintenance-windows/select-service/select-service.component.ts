import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent {

  constructor(
    private maintenanceApi: MaintenanceApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  serviceListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['service_code', 'service_subject', 'contractor_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.serviceListData = [];
    this.getServiceList();
    this.openButton.nativeElement.click();
  }

  getServiceList(){
    this.isFetchingData = true;

    this.maintenanceApi.getServiceList()
      .then(
        (res: any) => {
          // console.log(res);
          this.serviceListData = res.docs;
          this.isFetchingData = false;
          
          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.currentPage = 0;
            this.isDataAvailable = false;
          }

          this.aggregateData();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    // console.log(row);
  }
  
  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.serviceListData = this.aggregateTable.filterData(this.serviceListData, this.filterText, this.tableColumns);
    this.serviceListData = this.aggregateTable.sortData(this.serviceListData, this.sortColumn, this.sortDirection);
    this.serviceListData = this.aggregateTable.paginateData(this.serviceListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "SE");
  }
  
}
