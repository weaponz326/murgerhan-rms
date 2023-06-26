import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

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
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  serviceListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['service_code', 'service_subject', 'date_from', 'date_to', 'contractor_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getServiceList();
  }

  getServiceList(){
    this.isFetchingData = true;

    this.maintenanceApi.getServiceList()
      .then(
        (res: any) => {
          console.log(res);
          this.serviceListData = res.docs;
          this.isFetchingData = false;
          
          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0)
            this.isDataAvailable = false;
          else
            this.currentPage = 1

          this.aggregateData();
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

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.serviceListData = this.aggregateTable.filterData(this.serviceListData, this.filterText, this.tableColumns);
    this.serviceListData = this.aggregateTable.sortData(this.serviceListData, this.sortColumn, this.sortDirection);
    this.serviceListData = this.aggregateTable.paginateData(this.serviceListData, this.currentPage, this.pageSize);
  }

}
