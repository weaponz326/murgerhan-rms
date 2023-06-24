import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Task } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { SelectUserRoleComponent } from 'src/app/components/select-windows/users-windows/select-user-role/select-user-role.component';


@Component({
  selector: 'app-inspect-task',
  templateUrl: './inspect-task.component.html',
  styleUrls: ['./inspect-task.component.scss']
})
export class InspectTaskComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  taskData: any;

  isFetchingData = false;

  taskForm = new FormGroup({
    taskCode: new FormControl({value: '', disabled: true}),
    taskName: new FormControl({value: '', disabled: true}),
    taskType: new FormControl({value: '', disabled: true}),
    primaryAssignee: new FormControl({value: '', disabled: true}),
  })
  
  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('housekeeping_task_id') as string;

    this.housekeepingApi.getTask(id)
      .then((res) => {
        console.log(res);
        this.taskData = res;
        this.isFetchingData = false;
        this.setTaskData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  setTaskData(){
    this.taskForm.controls.taskCode.setValue(this.taskData.data().task_code);
    this.taskForm.controls.taskName.setValue(this.taskData.data().task_name);
    this.taskForm.controls.taskType.setValue(this.taskData.data().task_type);
    this.taskForm.controls.primaryAssignee.setValue(this.taskData.data().primary_assignee.data.full_name);
  }

}
