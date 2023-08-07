import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-system-images',
  templateUrl: './system-images.component.html',
  styleUrls: ['./system-images.component.scss']
})
export class SystemImagesComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
  ) {}

  @ViewChild('imageInputElementReference', { read: ElementRef, static: false }) imageInput!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  selectedFiles: File[] = [];
  AllSystemImagesListData: any;
  isUploading = false;

  imageCategory = '';

  systemImagesListData: any;
  warantyLabelsListData: any;
  informationLabelsListData: any;

  isSystemImagesDataAvailable = false;
  isWarantyLabelsDataAvailable = false;
  isInformationLabelsDataAvailable = false;

  ngOnInit(): void {
    this.getSystemImageList();
  }

  selectFile(category: any){
    console.log(category);
    this.imageCategory = category;
    this.imageInput.nativeElement.click();
  }

  onFileSelected(e: any): void {
    this.selectedFiles = Array.from(e.target.files);
    this.uploadSystemImage();
  }

  uploadSystemImage() {
    this.isUploading = true;

    const data = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      system: sessionStorage.getItem('maintenance_system_id') as string,
      image_category: this.imageCategory
    };

    this.maintenanceApi.uploadSystemImage(this.selectedFiles, data)
      .then(() => {
        // console.log('Images uploaded successfully');
        // Reset the selected files array
        this.selectedFiles = [];
        setTimeout(() => {
          this.getSystemImageList();
        }, 5000);
      })
      .catch((error) => {
        console.error('Error uploading images', error);
        this.isUploading = false;
      });
  }

  getSystemImageList(){
    this.maintenanceApi.getSystemImageList()
      .then(
        (res: any) => {
          // console.log(res);
          this.AllSystemImagesListData = res.docs;
          this.isUploading = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isUploading = false;
        }
      )
  }  

  groupSystemImageList(){
    const groupedArrays: any = {};

    this.AllSystemImagesListData.forEach((item: any) => {
      const category = item.category;
      
      if (!groupedArrays[category]) {
        groupedArrays[category] = [];
      }
      
      groupedArrays[category].push(item);
    });

    // Now you have separate arrays for each category
    this.systemImagesListData = groupedArrays['system_images'];
    this.warantyLabelsListData = groupedArrays['waranty_labels'];
    this.informationLabelsListData = groupedArrays['information_labels'];
  }

}