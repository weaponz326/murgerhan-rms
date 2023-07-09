import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { NewTaskComponent } from '../new-task/new-task.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('newTaskComponentReference', { read: NewTaskComponent, static: false }) newTask!: NewTaskComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  taskListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['task_code', 'task_name', 'from_date', 'to_date', 'task_type', 'task_status'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList(){
    this.isFetchingData = true;

    this.housekeepingApi.getTaskList()
      .then(
        (res: any) => {
          // console.log(res);
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
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewTask(taskId: any){
    // console.log(taskId);

    sessionStorage.setItem("housekeeping_task_id", taskId);
    this.router.navigateByUrl("/modules/housekeeping/tasks/view-task");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.taskListData = this.aggregateTable.filterData(this.taskListData, this.filterText, this.tableColumns);
    this.taskListData = this.aggregateTable.sortData(this.taskListData, this.sortColumn, this.sortDirection);
    this.taskListData = this.aggregateTable.paginateData(this.taskListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "TK");
  }

}
