import { Component, ViewChild } from '@angular/core';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { TaskImage } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { serverTimestamp } from 'firebase/firestore';


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

  selectedFiles: File[] = [];
  taskImageListData: any;
  taskData: any;

  isUploading = false;

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
      sessionStorage.getItem('housekeeping_task_inpection_id') as string

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
        console.error('Error uploading images', error);
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

}
