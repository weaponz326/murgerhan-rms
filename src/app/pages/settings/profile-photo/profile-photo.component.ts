import { Component, ViewChild } from '@angular/core';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss']
})
export class ProfilePhotoComponent {

  constructor(private usersApi: UsersApiService) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  imageUrl: string = "";
  selectedImage: File | undefined;

  isSavingPhoto = false;

  ngOnInit(): void {
    this.getBasicUser();
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    this.isSavingPhoto = true;

    const id = localStorage.getItem('uid') as string;

    if (this.selectedImage) {
      this.usersApi.uploadImage(id, this.selectedImage)
        .then(() => {
          console.log("image uploaded...");
          this.getBasicUser();
        })
        .catch((error: any) => {
          console.error('Error uploading image:', error);
          this.isSavingPhoto = false;
        });
    }
  }

  getBasicUser() {
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getBasicUser(id)
      .then((res) => {
        console.log(res.data());
        let resData: any = res;
        this.imageUrl = resData.data().profile_photo;
        this.isSavingPhoto = false;
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingPhoto = false;
      };
  }

}
