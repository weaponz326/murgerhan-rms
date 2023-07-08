import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}
  
  roleData: any;

  isFetchingData = false;

  basicProfileData: any;
  additionalProfileData: any;
  availabilityData: any;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  
  ngOnInit(): void {
    this.getBasicUser();
    this.getAdditionalUser();
    this.getAvailability();
  }

  getBasicUser() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('users_user_id') as string;

    this.usersApi.getBasicUser(id)
      .then((res) => {
        // console.log(res);
        this.basicProfileData = res;
        this.isFetchingData = false;
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  getAdditionalUser() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('users_user_id') as string;

    this.usersApi.getAdditionalUser(id)
      .then((res) => {
        // console.log(res);
        this.additionalProfileData = res;
        this.isFetchingData = false;
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  getAvailability() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('users_user_id') as string;

    this.usersApi.getAvailability(id)
      .then((res) => {
        // console.log(res);
        this.availabilityData = res;
        this.isFetchingData = false;
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

}
