import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private hosuekeepingApi: HousekeepingApiService,
    private maintenanceApi: MaintenanceApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  email: string = "";

  issuesData: any[] = [];
  incidentsData: any[] = [];
  notificationsData: any[] = [];

  ngOnInit(): void {
    this.getAuth();
    this.getUserIssueList();
    this.getUserIncidentList();
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

  getUserIssueList() {
    const id = localStorage.getItem('uid') as string;

    this.maintenanceApi.getUserIssueList(id)
      .then((res) => {
        // console.log(res);
        this.issuesData = res.docs;
        this.setNotificationsData();
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
      };
  }

  getUserIncidentList() {
    const id = localStorage.getItem('uid') as string;

    this.hosuekeepingApi.getUserIncidentList(id)
      .then((res) => {
        // console.log(res;
        this.incidentsData = res.docs;
        this.setNotificationsData();
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
      };
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

  setNotificationsData(){
    this.notificationsData = this.issuesData.concat(this.incidentsData);

    this.notificationsData.sort((a: any, b: any) => {
      return new Date(b.data().created_at).getTime() - new Date(a.data().created_at).getTime();
    });
  }

  viewNotification(data: any){
    if(data.data().hasOwnProperty('incident_status')){
      sessionStorage.setItem('housekeeping_incident_id', data.id)
      this.router.navigateByUrl('/modules/housekeeping/incidents/view-incident');
    }
    else if(data.data().hasOwnProperty('issue_status')){
      sessionStorage.setItem('maintenance_issue_id', data.id)
      this.router.navigateByUrl('/modules/maintenance/issues/view-issue');
    }
  }

}
