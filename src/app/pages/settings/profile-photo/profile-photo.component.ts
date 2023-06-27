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
    this.getBasicProfile();
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    if (this.selectedImage) {
      this.usersApi.uploadImage(this.selectedImage)
        .then((url: string) => {
          console.log('Image URL:', url);
          // Do something with the URL, like saving it to Firestore
          this.updateBasic(url);
        })
        .catch((error: any) => {
          console.error('Error uploading image:', error);
        });
    }
  }

  updateBasic(url: string) {
    this.isSavingPhoto = true;
    
    const id = localStorage.getItem('uid') as string;
    let data = {profile_photo: url}

    this.usersApi.updateBasicUser(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingPhoto = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingPhoto = false;
      });
  }

  getBasicProfile() {
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getBasicUser(id)
      .then((res) => {
        console.log(res);
        let resData: any = res;
        this.imageUrl = resData.data().profile_photo;
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      };
  }

}
