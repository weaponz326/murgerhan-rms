import { Component, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

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
    private usersApi: UsersApiService,
    private hosuekeepingApi: HousekeepingApiService,
    private maintenanceApi: MaintenanceApiService
  ) { 
    this.initProgressBar();
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isMobileView: boolean = false;

  themeCheck = false;
  themeClass = "dark"
  themeBackground = "light";

  progressValue: number = 0;
  progressTimer: any;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  branchName = "";
  name: string = "";
  email: string = "";

  userRoleData: any;
  basicProfileData: any;

  issuesData: any[] = [];
  incidentsData: any[] = [];
  notificationsData: any[] = [];
  notificationAlerts = 0;

  ngOnInit(): void {
    this.getAuth();
    this.getUserRole();
    this.initTheme();
    this.initBranch();
    this.getUserIssueList();
    this.getUserIncidentList();
  }

  ngAfterViewInit(): void {
    this.isMobileView = window.innerWidth < 992;
    this.toggleSideNav();
    this.toggleSideNavByLink();
  }

  initTheme(){
    if(localStorage.getItem("theme")){
      // console.log("theme is set");
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
    // console.log(this.themeCheck);

    if(this.themeCheck == true){
      this.themeClass = "light";
      this.themeBackground = "white";
    }
    else{
      this.themeClass = "dark";
      this.themeBackground = "light";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileView = window.innerWidth < 992;
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

  // implementation in sb-AdminApiService.js file not working
  toggleSideNav(){
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        document.body.classList.toggle('sb-sidenav-toggled');
      }
      sidebarToggle.addEventListener('click', event => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
      });      
    }    
  }

  toggleSideNavByLink() {
    if (this.isMobileView) {
      const sideNavLinks = document.querySelectorAll('#sidenavAccordion .nav-router-link');
      sideNavLinks.forEach((link: any) => {
        link.addEventListener('click', () => {
          document.body.classList.toggle('sb-sidenav-toggled');
        });
      });
    }
  }
  
  initBranch(){
    if(localStorage.getItem("selected_branch"))
      JSON.parse(String(localStorage.getItem("selected_branch"))).data.branch_name;
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

  getUserRole() {
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getUserRole(id)
      .then((res) => {
        // console.log(res.data());
        this.userRoleData = res;

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

          // console.log(data);
          
          localStorage.setItem("selected_user_role", JSON.stringify(data));
          localStorage.setItem("selected_branch", JSON.stringify(data.data.branch));
          localStorage.setItem("user_role", String(data.data.staff_role));
          this.branchName = JSON.parse(String(localStorage.getItem("selected_branch"))).data.branch_name;          
        }
        catch{
          // console.log("probably not logged in!");
        }
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
      };
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
  
    let issueAlerts = this.issuesData.filter(obj => obj.data().issue_status === 'Needs Fixing').length;
    let incidentAlerts = this.incidentsData.filter(obj => obj.data().incident_status === 'Unresolved').length;
    this.notificationAlerts = issueAlerts + incidentAlerts;

    this.notificationsData = this.notificationsData.slice(0, 5);

  }

  viewNotification(event: any, data: any){
    event.stopPropagation();

    if(data.data().hasOwnProperty('incident_status')){
      // console.log(data.id);
      sessionStorage.setItem('housekeeping_incident_id', data.id)
      this.router.navigateByUrl('/modules/housekeeping/incidents/view-incident');
    }
    else if(data.data().hasOwnProperty('issue_status')){
      // console.log(data.id);
      sessionStorage.setItem('maintenance_issue_id', data.id)
      this.router.navigateByUrl('/modules/maintenance/issues/view-issue');
    }
  }

}
