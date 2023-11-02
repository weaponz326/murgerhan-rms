import { Component, ViewChild } from '@angular/core';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { TaskImage } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { serverTimestamp } from 'firebase/firestore';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-task-images',
  templateUrl: './task-images.component.html',
  styleUrls: ['./task-images.component.scss']
})
export class TaskImagesComponent {

  constructor(
    private housekeepingApi: HousekeepingApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  selectedFiles: File[] = [];
  taskImageListData: any;
  taskData: any;

  isUploading = false;

  deleteId: any;

  ngOnInit(): void {
    this.getTask();
  }

  onFileSelected(e: any): void {
    this.selectedFiles = Array.from(e.target.files);
    this.uploadTaskImage();
  }

  getImages(){
    if(this.taskData.data().occurance == "Non-Recurring") 
      this.getTaskImageList();
    else
      this.getRecurringTaskImageList();
  }

  getTask() {
    const id = sessionStorage.getItem('housekeeping_task_id') as string;

    this.housekeepingApi.getTask(id)
      .then((res) => {
        // console.log(res);
        this.taskData = res;
        this.getImages();  
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
      };
  }

  uploadTaskImage() {
    this.isUploading = true;

    let taskId: any;

    if(this.taskData.data().occurance == "Non-Recurring") 
      taskId = sessionStorage.getItem('housekeeping_task_id') as string;
    else
      taskId = sessionStorage.getItem('housekeeping_task_inspection_id') as string

    let data = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      task: taskId,
    };

    this.housekeepingApi.uploadTaskImage(this.selectedFiles, data)
      .then(() => {
        // console.log('Images uploaded successfully');
        // Reset the selected files array
        this.selectedFiles = [];
        setTimeout(() => {
          this.getImages();
        }, 5000);
      })
      .catch((error) => {
        // console.error('Error uploading images', error);
        this.isUploading = false;  
      });
  }

  getTaskImageList(){
    this.housekeepingApi.getTaskImageList()
      .then(
        (res: any) => {
          // console.log(res);
          this.taskImageListData = res.docs;
          this.isUploading = false;  
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isUploading = false;  
        }
      )
  }

  getRecurringTaskImageList(){
    this.housekeepingApi.getRecurringTaskImageList()
      .then(
        (res: any) => {
          // console.log(res);
          this.taskImageListData = res.docs;
          this.isUploading = false;  
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isUploading = false;  
        }
      )
  }

  deleteTaskImage(){
    this.housekeepingApi.deleteTaskImage(this.deleteId)
      .then(
        (res: any) => {
          // console.log(res);
          
          if(this.taskData.data().occurance == "Non-Recurring") 
            this.getTaskImageList();
          else
            this.getRecurringTaskImageList();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isUploading = false;  
        }
      )
  }

  confirmDelete(event: any, id: any){
    event.preventDefault();

    // console.log(id);
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
