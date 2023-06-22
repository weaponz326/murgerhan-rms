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
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('selectUserRoleComponentReference', { read: SelectUserRoleComponent, static: false }) selectUserRole!: SelectUserRoleComponent;

  taskData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  selectedUserRoleId: any;
  selectedUserRoleData: any;

  isFetchingData = false;
  isSavingTask = false;
  isDeletingTask = false;

  taskForm = new FormGroup({
    taskCode: new FormControl(''),
    taskName: new FormControl(''),
    taskType: new FormControl(''),
    primaryAssignee: new FormControl({value: '', disabled: true}),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    taskStatus: new FormControl(''),
    description: new FormControl(''),
    occurance: new FormControl(''),
    frequency: new FormControl(''),
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

  updateTask() {
    this.isSavingTask = true;
    
    const id = sessionStorage.getItem('housekeeping_task_id') as string;

    let data: Task = {
      created_at: this.taskData.data().created_at,
      updated_at: serverTimestamp(),
      task_code: this.taskForm.controls.taskCode.value as string,
      task_name: this.taskForm.controls.taskName.value as string,
      task_type: this.taskForm.controls.taskType.value as string,
      from_date: this.taskForm.controls.fromDate.value,
      to_date: this.taskForm.controls.toDate.value,
      task_status: this.taskForm.controls.taskStatus.value as string,
      description: this.taskForm.controls.description.value as string,
      occurance: this.taskForm.controls.occurance.value as string,
      frequency: this.taskForm.controls.frequency.value as string,
      primary_assignee: {
        id: this.selectedUserRoleId,
        data: {
          staff_code: this.selectedUserRoleData.staff_code,
          full_name: this.selectedUserRoleData.full_name,
          staff_role: this.selectedUserRoleData.staff_role,
        }
      },
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    this.housekeepingApi.updateTask(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingTask = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingTask = false;
      });
  }

  deleteTask() {
    this.isDeletingTask = true;

    const id = sessionStorage.getItem('housekeeping_task_id') as string;

    this.housekeepingApi.deleteTask(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/housekeeping/tasks/all-tasks')
        this.isDeletingTask = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingTask = false;
      });
  }

  setTaskData(){
    this.taskForm.controls.taskCode.setValue(this.taskData.data().task_code);
    this.taskForm.controls.taskName.setValue(this.taskData.data().task_name);
    this.taskForm.controls.taskType.setValue(this.taskData.data().task_type);
    this.taskForm.controls.primaryAssignee.setValue(this.taskData.data().primary_assignee.data.full_name);
    this.taskForm.controls.fromDate.setValue(this.taskData.data().from_date);
    this.taskForm.controls.toDate.setValue(this.taskData.data().to_date);
    this.taskForm.controls.taskStatus.setValue(this.taskData.data().task_status);
    this.taskForm.controls.description.setValue(this.taskData.data().description);
    this.taskForm.controls.occurance.setValue(this.taskData.data().occurance);
    this.taskForm.controls.frequency.setValue(this.taskData.data().frequency);

    this.selectedUserRoleId = this.taskData.data().primary_assignee.id;
    this.selectedUserRoleData = this.taskData.data().primary_assignee.data;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
