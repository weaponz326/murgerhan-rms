import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

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
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  systemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['system_code', 'system_name', 'system_type'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getSystemList();
  }

  getSystemList(){
    this.isFetchingData = true;

    this.maintenanceApi.getSystemList()
      .then(
        (res: any) => {
          console.log(res);
          this.systemListData = res.docs;
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

  viewSystem(systemId: any){
    console.log(systemId);

    sessionStorage.setItem("maintenance_system_id", systemId);
    this.router.navigateByUrl("/modules/maintenance/systems/view-system");
  }

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.systemListData = this.aggregateTable.filterData(this.systemListData, this.filterText, this.tableColumns);
    this.systemListData = this.aggregateTable.sortData(this.systemListData, this.sortColumn, this.sortDirection);
    this.systemListData = this.aggregateTable.paginateData(this.systemListData, this.currentPage, this.pageSize);
  }
  
}
