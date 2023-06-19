import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

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
  ) { }

  @ViewChild('newTaskComponentReference', { read: NewTaskComponent, static: false }) newTask!: NewTaskComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  taskListData: any[] = [];

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

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList(){
    this.isFetchingData = true;

    this.housekeepingApi.getTaskList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.taskListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewTask(taskId: any){
    console.log(taskId);

    sessionStorage.setItem("housekeeping_task_id", taskId);
    this.router.navigateByUrl("/modules/housekeeping/tasks/edit-task");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getTaskList();
  }

}
