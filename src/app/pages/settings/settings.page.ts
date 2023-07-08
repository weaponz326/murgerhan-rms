import { Component, ViewChild } from '@angular/core';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage {

  constructor(
    private authApi: AuthApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  email: string = "";

  ngOnInit(): void {
    this.getAuth();
  }

  getAuth(){
    this.isAuthLoading = true;

    this.authApi.getAuth()
      .subscribe(
        (res: any) => {
          // console.log(res);
          this.isAuthLoading = false;

          localStorage.setItem('uid', res.uid);
          localStorage.setItem('email', res.email);

          if (res.uid){
            this.isLoggedIn = true;
            this.email = res.email;
          }
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isLoggedIn = false;
          this.isAuthLoading = false;
        }
      )
  }

  logout(){
    // e.stopPropagation();
    // console.log("u logging out? ...where u going?");

    this.authApi.logout()
      .then(
        (res: any) => {
          // console.log(res);
          localStorage.clear();
          window.location.href = "/";
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
        }
      )
  }

}
