import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Task } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { SelectUserRoleComponent } from 'src/app/components/select-windows/users-windows/select-user-role/select-user-role.component';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService
  ) {}  
  
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('selectUserRoleComponentReference', { read: SelectUserRoleComponent, static: false }) selectUserRole!: SelectUserRoleComponent;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  selectedUserRoleId: any;
  selectedUserRoleData: any;

  isSavingTask = false;
  isSaved = false;

  taskForm = new FormGroup({
    taskCode: new FormControl(''),
    taskName: new FormControl('', Validators.required),
    taskType: new FormControl(''),
    primaryAssignee: new FormControl({value: '', disabled: true}, Validators.required),
    fromDate: new FormControl(new Date().toISOString().slice(0, 10), Validators.required),
    toDate: new FormControl(new Date().toISOString().slice(0, 10), Validators.required),
    taskStatus: new FormControl(''),
    description: new FormControl(''),
    occurance: new FormControl('Non-Recurring', Validators.required),
    frequency: new FormControl({value: '', disabled: true}),
  })

  openModal(){
    this.newButton.nativeElement.click();
  }

  createTask() {
    this.isSaved = true;
    
    let data: Task = {
      created_at: serverTimestamp(),
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

    // console.log(data);

    if(this.taskForm.valid){
      this.isSavingTask = true;

      this.housekeepingApi.createTask(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('housekeeping_task_id', res.id);
            this.router.navigateByUrl("/modules/housekeeping/tasks/view-task");
          }

          this.dismissButton.nativeElement.click();
          this.isSavingTask = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingTask = false;
        });
    }
  }

  openUserRoleWindow(){
    // console.log("You are opening select userrole window")
    this.selectUserRole.openModal();
  }

  onUserRoleSelected(userRoleData: any){
    // console.log(userRoleData);
    this.selectedUserRoleId = userRoleData.id;
    this.selectedUserRoleData = userRoleData.data();
    this.taskForm.controls.primaryAssignee.setValue(userRoleData.data().full_name);
  }

  enableFrequencyInput(e: any){
    // console.log(e.target.value)
    if(e.target.value == 'Non-Recurring'){
      this.taskForm.controls.frequency.disable();
      this.taskForm.controls.frequency.setValue('');
    }
    else{
      this.taskForm.controls.frequency.enable();
      this.taskForm.controls.frequency.setValue('Daily');
    }
  }

}
