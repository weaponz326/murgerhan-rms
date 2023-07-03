import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) { 
    this.initProgressBar();
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  progressValue: number = 0;
  progressTimer: any;

  branchName: any;
  userRoleData: any;

  ngOnInit(): void {
    this.getUserRole();    
  }

  ngAfterViewInit(): void {
    // this.toggleSideNav();    
  }

  // // NB: same script located in assets/scripts, but doesn't work from there
  // toggleSideNav(){
  //   const sidebarToggle = document.body.querySelector('#sidebarToggle');
  //   if (sidebarToggle) {
  //     // Uncomment Below to persist sidebar toggle between refreshes
  //     if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
  //       document.body.classList.toggle('sb-sidenav-toggled');
  //     }
  //     sidebarToggle.addEventListener('click', event => {
  //       event.preventDefault();
  //       document.body.classList.toggle('sb-sidenav-toggled');
  //       localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
  //     });
  //   }
  // }

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
      if (this.progressValue < 100) {
        this.progressValue += incrementStep;
        this.incrementProgress();
      }
    }, incrementInterval);
  }

  getUserRole() {
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getUserRole(id)
      .then((res) => {
        console.log(res.data());
        this.userRoleData = res.data();
        try{ this.branchName = this.userRoleData.branch.data.branch_name; }
        catch { console.log('you dont have a branch') }
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      };
  }
  
}
