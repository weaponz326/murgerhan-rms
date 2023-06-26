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

  ngOnInit(): void {
    this.getTaskImageList();
  }

  onFileSelected(e: any): void {
    this.selectedFiles = Array.from(e.target.files);
    this.uploadTaskImage();
  }

  uploadTaskImage() {
    const data = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      task: sessionStorage.getItem('housekeeping_task_id') as string,
    };

    this.housekeepingApi.uploadTaskImage(this.selectedFiles, data)
      .then(() => {
        console.log('Images uploaded successfully');
        // Reset the selected files array
        this.selectedFiles = [];
        this.getTaskImageList();
      })
      .catch((error) => {
        console.error('Error uploading images', error);
      });
  }

  getTaskImageList(){
    this.housekeepingApi.getTaskImageList()
      .then(
        (res: any) => {
          console.log(res);
          this.taskImageListData = res.docs;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      )
  }

}
