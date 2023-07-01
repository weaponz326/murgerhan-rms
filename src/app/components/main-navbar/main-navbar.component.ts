import { Component, ViewChild } from '@angular/core';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from '../module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {

  constructor(
    private authApi: AuthApiService,
    private usersApi: UsersApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  branchName = "";
  name: string = "";
  email: string = "";
  photo: string = "../../../../assets/images/utilities/photo-avatar.jpg";

  userRoleData: any;
  basicProfileData: any;

  ngOnInit(): void {
    this.getAuth();
    this.getBasicUser();
    this.getUserRole();
  }

  getAuth(){
    this.isAuthLoading = true;

    this.authApi.getAuth()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.isAuthLoading = false;

          localStorage.setItem('uid', res.uid);
          localStorage.setItem('email', res.email);

          if (res.uid){
            this.isLoggedIn = true;
            this.email = res.email;
          }
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isLoggedIn = false;
          this.isAuthLoading = false;
        }
      )
  }

  getUserRole() {
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getUserRole(id)
      .then((res) => {
        console.log(res.data());
        this.userRoleData = res;
        try{
          this.branchName = this.userRoleData.data().branch.data.branch_name;
          localStorage.setItem("selected_branch", JSON.stringify(this.userRoleData.data().branch));
          localStorage.setItem("selected_user_role", JSON.stringify(this.userRoleData.data()));
        }
        catch{
          console.log("probably not logged in!");
        }
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      };
  }

  getBasicUser() {
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getBasicUser(id)
      .then((res) => {
        console.log(res);
        this.basicProfileData = res;
        // TODO: set name and profile pic in navbar
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      };
  }

  logout(){
    // e.stopPropagation();
    console.log("u logging out? ...where u going?");

    this.authApi.logout()
      .then(
        (res: any) => {
          console.log(res);
          localStorage.clear();
          window.location.href = "/";
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      )
  }

}
