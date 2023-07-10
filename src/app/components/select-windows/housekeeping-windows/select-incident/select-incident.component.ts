import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-incident',
  templateUrl: './select-incident.component.html',
  styleUrls: ['./select-incident.component.scss']
})
export class SelectIncidentComponent {

  constructor(
    private housekeepingApi: HousekeepingApiService,
    private aggregateTable: AggregateTableService,
    public formatId: FormatIdService
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  incidentListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['incident_code', 'incident_subject', 'incident_date', 'incident_status'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.incidentListData = [];
    this.getIncidentList();
    this.openButton.nativeElement.click();
  }

  getIncidentList(){
    this.isFetchingData = true;

    this.housekeepingApi.getIncidentList()
      .then(
        (res: any) => {
          // console.log(res);
          this.incidentListData = res.docs;
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
    this.incidentListData = this.aggregateTable.filterData(this.incidentListData, this.filterText, this.tableColumns);
    this.incidentListData = this.aggregateTable.sortData(this.incidentListData, this.sortColumn, this.sortDirection);
    this.incidentListData = this.aggregateTable.paginateData(this.incidentListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "NC");
  }

}
