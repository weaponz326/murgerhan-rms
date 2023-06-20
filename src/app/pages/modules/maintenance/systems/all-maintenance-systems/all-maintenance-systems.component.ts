import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-maintenance-systems',
  templateUrl: './all-maintenance-systems.component.html',
  styleUrls: ['./all-maintenance-systems.component.scss']
})
export class AllMaintenanceSystemsComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  systemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPageSize = 0;
  currentPageNumber = 0;
  defaultPageSize = 25;
  sorting = {
    created_at: "desc",
    log_code: "",
    user: "",
    activity: ""
  };
  querying = {
    created_at: "",
    log_code: "",
    user: "",
    activity: ""
  }

  ngOnInit(): void {
    this.getSystemList();
  }

  getSystemList(){
    this.isFetchingData = true;

    this.maintenanceApi.getSystemList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.systemListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewSystem(systemId: any){
    console.log(systemId);

    sessionStorage.setItem("maintenance_system_id", systemId);
    this.router.navigateByUrl("/modules/maintenance/systems/view-system");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getSystemList();
  }
  
}
