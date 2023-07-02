import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-contractor',
  templateUrl: './select-contractor.component.html',
  styleUrls: ['./select-contractor.component.scss']
})
export class SelectContractorComponent {

  constructor(
    private maintenanceApi: MaintenanceApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  contractorListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['contractor_code', 'contractor_name', 'phone'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.contractorListData = [];
    this.getContractorList();
    this.openButton.nativeElement.click();
  }

  getContractorList(){
    this.isFetchingData = true;

    this.maintenanceApi.getContractorList()
      .then(
        (res: any) => {
          console.log(res);
          this.contractorListData = res.docs;
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
    this.contractorListData = this.aggregateTable.filterData(this.contractorListData, this.filterText, this.tableColumns);
    this.contractorListData = this.aggregateTable.sortData(this.contractorListData, this.sortColumn, this.sortDirection);
    this.contractorListData = this.aggregateTable.paginateData(this.contractorListData, this.currentPage, this.pageSize);
  }
  
}
