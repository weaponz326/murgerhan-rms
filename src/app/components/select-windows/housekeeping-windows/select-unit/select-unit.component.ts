import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-unit',
  templateUrl: './select-unit.component.html',
  styleUrls: ['./select-unit.component.scss']
})
export class SelectUnitComponent {

  constructor(
    private housekeepingApi: HousekeepingApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  unitListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['unit_code', 'unit_name', 'unit_type'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.unitListData = [];
    this.getUnitList();
    this.openButton.nativeElement.click();
  }

  getUnitList(){
    this.isFetchingData = true;

    this.housekeepingApi.getUnitList()
      .then(
        (res: any) => {
          // console.log(res);
          this.unitListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0)
            this.isDataAvailable = false;
          else
            this.currentPage = 1

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
    this.unitListData = this.aggregateTable.filterData(this.unitListData, this.filterText, this.tableColumns);
    this.unitListData = this.aggregateTable.sortData(this.unitListData, this.sortColumn, this.sortDirection);
    this.unitListData = this.aggregateTable.paginateData(this.unitListData, this.currentPage, this.pageSize);
  }
  
  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "UT");
  }

}
