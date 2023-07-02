import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';


@Component({
  selector: 'app-select-task',
  templateUrl: './select-task.component.html',
  styleUrls: ['./select-task.component.scss']
})
export class SelectTaskComponent {

  constructor(
    private housekeepingApi: HousekeepingApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  taskListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['task_code', 'task_name', 'from_date', 'task_type'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  openModal(){
    this.taskListData = [];
    this.getTaskList();
    this.openButton.nativeElement.click();
  }

  getTaskList(){
    this.isFetchingData = true;

    this.housekeepingApi.getTaskList()
      .then(
        (res: any) => {
          console.log(res);
          this.taskListData = res.docs;
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
    this.taskListData = this.aggregateTable.filterData(this.taskListData, this.filterText, this.tableColumns);
    this.taskListData = this.aggregateTable.sortData(this.taskListData, this.sortColumn, this.sortDirection);
    this.taskListData = this.aggregateTable.paginateData(this.taskListData, this.currentPage, this.pageSize);
  }
  
}
