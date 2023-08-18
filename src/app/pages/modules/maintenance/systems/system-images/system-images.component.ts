import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


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
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  selectedFiles: File[] = [];
  AllSystemImagesListData: any;
  isUploading = false;

  imageCategory = '';

  systemImagesListData: any;
  warrantyLabelsListData: any;
  informationLabelsListData: any;

  isSystemImagesDataAvailable = false;
  isWarrantyLabelsDataAvailable = false;
  isInformationLabelsDataAvailable = false;

  deleteId: any;

  ngOnInit(): void {
    this.getSystemImageList();
  }

  selectFile(category: any){
    // console.log(category);
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
        // console.error('Error uploading images', error);
        this.isUploading = false;
      });
  }

  getSystemImageList(){
    this.maintenanceApi.getSystemImageList()
      .then(
        (res: any) => {
          // console.log(res.docs[0].data());
          this.AllSystemImagesListData = res.docs;
          this.groupSystemImageList();
          this.isUploading = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isUploading = false;
        }
      )
  }  

  deleteSystemImage(){
    this.maintenanceApi.deleteSystemImage(this.deleteId)
      .then(
        (res: any) => {
          // console.log(res);
          this.getSystemImageList();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
        }
      )
  }

  groupSystemImageList(){
    const groupedArrays: any = {};

    this.AllSystemImagesListData.forEach((item: any) => {
      const category = item.data().image_category;
      // console.log(item.data().image_category)
      
      if (!groupedArrays[category]) {
        groupedArrays[category] = [];
      }
      
      groupedArrays[category].push(item);
      // console.log(groupedArrays)
    });

    // Now you have separate arrays for each category
    this.systemImagesListData = groupedArrays['system_image'];
    this.warrantyLabelsListData = groupedArrays['warranty_label'];
    this.informationLabelsListData = groupedArrays['information_label'];

    if (this.systemImagesListData?.length > 0) this.isSystemImagesDataAvailable = true;
    if (this.warrantyLabelsListData?.length > 0) this.isWarrantyLabelsDataAvailable = true;
    if (this.informationLabelsListData?.length > 0) this.isInformationLabelsDataAvailable = true;
  }

  confirmDelete(event: any, id: any){
    event.preventDefault();

    // console.log(id);
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
