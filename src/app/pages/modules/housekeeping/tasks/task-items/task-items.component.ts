import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';

import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddTaskItemComponent } from '../add-task-item/add-task-item.component';
import { EditTaskItemComponent } from '../edit-task-item/edit-task-item.component';


@Component({
  selector: 'app-task-items',
  templateUrl: './task-items.component.html',
  styleUrls: ['./task-items.component.scss']
})
export class TaskItemsComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addTaskItemComponentReference', { read: AddTaskItemComponent, static: false }) addTaskItem!: AddTaskItemComponent;
  @ViewChild('editTaskItemComponentReference', { read: EditTaskItemComponent, static: false }) editTaskItem!: EditTaskItemComponent;
  
  taskItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  lastItem = 0;

  ngOnInit(): void {
    this.getTaskItemList();
  }

  getTaskItemList(){
    this.isFetchingData = true;

    this.housekeepingApi.getTaskItemList()
      .then(
        (res: any) => {
          console.log(res);
          this.taskItemListData = res.docs;

          try { this.lastItem = res.docs.length }
          catch{ this.lastItem = 0 }

          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createTaskItem(data: any) {
    this.addTaskItem.isItemSaving = true;

    console.log(data);

    this.housekeepingApi.createTaskItem(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          this.getTaskItemList();

          this.addTaskItem.isItemSaving = false;
          this.addTaskItem.dismissButton.nativeElement.click();
          this.addTaskItem.resetForm();
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.addTaskItem.isItemSaving = false;
      });
  }

  updateTaskItem(task_item: any) {
    this.editTaskItem.isItemSaving = true;
    
    this.housekeepingApi.updateTaskItem(task_item.id, task_item.data)
      .then((res) => {
        console.log(res);
        this.editTaskItem.isItemSaving = false;
        this.editTaskItem.dismissButton.nativeElement.click();
        this.getTaskItemList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.editTaskItem.isItemSaving = false;
      });
  }

  deleteTaskItem() {
    this.isItemDeleting = true;

    this.housekeepingApi.deleteTask(this.deleteId)
      .then((res) => {
        console.log(res);
        this.isItemDeleting = false;
        this.getTaskItemList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  openEditItem(data: any){
    console.log(data);
    this.editTaskItem.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
