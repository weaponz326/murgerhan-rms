import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-maintenance-services',
  templateUrl: './all-maintenance-services.component.html',
  styleUrls: ['./all-maintenance-services.component.scss']
})
export class AllMaintenanceServicesComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  serviceListData: any[] = [];

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
    this.getServiceList();
  }

  getServiceList(){
    this.isFetchingData = true;

    this.maintenanceApi.getServiceList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.serviceListData = res.docs;
          this.isFetchingData = false;
          
          if(res.docs.length == 0)
            this.isDataAvailable = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewService(serviceId: any){
    console.log(serviceId);

    sessionStorage.setItem("maintenance_service_id", serviceId);
    this.router.navigateByUrl("/modules/maintenance/services/view-service");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getServiceList();
  }

}
