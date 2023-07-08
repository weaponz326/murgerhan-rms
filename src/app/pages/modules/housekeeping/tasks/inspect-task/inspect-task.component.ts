import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Task, TaskItem } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


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
  taskItemListData: any[] = [];
  taskImageListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;
  isItemSaving: boolean =  false;

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
        // console.log(res);
        this.taskData = res;
        this.isFetchingData = false;
        this.setTaskData();      
        
        this.getTaskItemList();
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  getTaskItemList(){
    this.isFetchingData = true;

    this.housekeepingApi.getTaskItemList()
      .then(
        (res: any) => {
          // console.log(res.docs);
          this.isFetchingData = false;
          this.taskItemListData = res.docs;
          this.getTaskImageList();

          if(this.taskData.data().occurance == "Recurring")
            this.getRecurringTaskItemList()
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getRecurringTaskItemList(){
    this.isFetchingData = true;

    this.housekeepingApi.getRecurringTaskItemList()
      .then(
        (res: any) => {
          // console.log(res.docs);
          this.isFetchingData = false;

          if(res.docs.length == 0){
            this.initRecurringItems();
          }
          else{
            this.taskItemListData = [];
            this.taskItemListData = res.docs;
            this.getRecurringTaskImageList();
          }
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  updateTaskItem(event: any, itemId: any) {
    this.isItemSaving = true;

    let data = { item_status: event.target.checked };
    
    this.housekeepingApi.updateTaskItem(itemId, data)
      .then((res) => {
        // console.log(res);
        this.isItemSaving = false;

        if(this.taskData.data().occurance == "Non-Recurring")
          this.getTaskItemList();
        else
          this.getRecurringTaskItemList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isItemSaving = false;
      });
  }

  getTaskImageList(){
    this.housekeepingApi.getTaskImageList()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs.length != 0)
            this.taskImageListData = res.docs.slice(0,4);
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
        }
      )
  }

  getRecurringTaskImageList(){
    this.housekeepingApi.getRecurringTaskImageList()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs.length != 0)
            this.taskImageListData = res.docs.slice(0,4);
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
        }
      )
  }

  initRecurringItems(){
    // console.log("initting recurring task items");

    this.taskItemListData.forEach((item: any) => {      
      let data: TaskItem = {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        item_number: item.data().item_number,
        task: sessionStorage.getItem('housekeeping_task_inspection_id') as string,
        task_description: item.data().task_description,
        item_status: false,
        unit: {
          id: item.data().unit.id,
          data: {
            unit_code: item.data().unit.data.unit_code,
            unit_name: item.data().unit.data.unit_name,
          }
        }
      }

      this.housekeepingApi.createTaskItem(data)
      .then((res: any) => {
        // console.log(res);
        this.getRecurringTaskItemList();
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
      });
      
    });
  }

  setTaskData(){
    this.taskForm.controls.taskCode.setValue(this.taskData.data().task_code);
    this.taskForm.controls.taskName.setValue(this.taskData.data().task_name);
    this.taskForm.controls.taskType.setValue(this.taskData.data().task_type);
    this.taskForm.controls.primaryAssignee.setValue(this.taskData.data().primary_assignee.data.full_name);
  }

}

