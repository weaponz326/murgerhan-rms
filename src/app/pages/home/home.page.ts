import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  constructor(
    private authApi: AuthApiService,
    private router: Router,
    private usersApi: UsersApiService
  ) { 
    this.initProgressBar();
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  themeCheck = false;
  themeClass = "dark"
  themeBackground = "light";

  progressValue: number = 0;
  progressTimer: any;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  branchName = JSON.parse(String(localStorage.getItem("selected_branch"))).data.branch_name;
  name: string = "";
  email: string = "";

  userRoleData: any;
  basicProfileData: any;

  ngOnInit(): void {
    this.getAuth();
    this.getUserRole();
    this.initTheme();
  }

  initTheme(){
    if(localStorage.getItem("theme")){
      console.log("theme is set");
      this.themeCheck = localStorage.getItem("theme") === "true";

      if(this.themeCheck == true){
        this.themeClass = "light";
        this.themeBackground = "white";
      }
      else{
        this.themeClass = "dark";
        this.themeBackground = "light";
      }
    }
  }

  setTheme(e: any){
    this.themeCheck = e.target.checked;
    localStorage.setItem("theme", String(this.themeCheck))
    console.log(this.themeCheck);

    if(this.themeCheck == true){
      this.themeClass = "light";
      this.themeBackground = "white";
    }
    else{
      this.themeClass = "dark";
      this.themeBackground = "light";
    }
  }

  initProgressBar(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progressValue = 0;
        this.incrementProgress();
      }

      if (event instanceof NavigationEnd) {
        clearTimeout(this.progressTimer);
        this.progressValue = 100;
        setTimeout(() => {
          this.progressValue = 0;
        }, 500);
      }

      if (event instanceof NavigationError) {
        this.connectionToast.openToast();

        clearTimeout(this.progressTimer);
        this.progressValue = 40;
        setTimeout(() => {
          this.progressValue = 0;
        }, 500);
      }
    });
  }

  incrementProgress() {
    const incrementStep = 10;
    const incrementInterval = 100;

    this.progressTimer = setTimeout(() => {
      if (this.progressValue < 90) {
        this.progressValue += incrementStep;
        this.incrementProgress();
      }
    }, incrementInterval);
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
        this.userRoleData = res.data();

        try{
          let data = {
            id: this.userRoleData.id,
            data: {
              staff_code: this.userRoleData.data().staff_code,
              full_name: this.userRoleData.data().full_name,
              staff_role: this.userRoleData.data().staff_role,
              branch: {
                id: this.userRoleData.data().branch.id,
                data: {
                  branch_name: this.userRoleData.data().branch.data.branch_name,
                  location: this.userRoleData.data().branch.data.location,
                }
              }
            }
          }
          
          localStorage.setItem("selected_user_role", JSON.stringify(data));
          localStorage.setItem("selected_branch", JSON.stringify(data.data.branch));
          this.branchName = JSON.parse(String(localStorage.getItem("selected_branch"))).data.branch_name;
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
