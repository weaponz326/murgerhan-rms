import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-system-maintenance-history',
  templateUrl: './system-maintenance-history.component.html',
  styleUrls: ['./system-maintenance-history.component.scss']
})
export class SystemMaintenanceHistoryComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) {}

  systemForm = new FormGroup({
    systemCode: new FormControl({value: '', disabled: true}),
    systemName: new FormControl({value: '', disabled: true}),
  })

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  systemData: any;
  serviceListData: any[] = [];

  isDataAvailable: boolean =  true;
  isFetchingData = false;

  tableColumns = ['service_code', 'date_from', 'date_to', 'service_subject'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;
  
  ngOnInit(): void {
    this.getSystem();
    this.getSystemServiceList();
  }

  getSystem() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('maintenance_system_id') as string;

    this.maintenanceApi.getSystem(id)
      .then((res) => {
        // console.log(res);
        this.systemData = res;
        this.isFetchingData = false;
        this.setSystemData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  setSystemData(){
    this.systemForm.controls.systemCode.setValue(this.formatId.formatId(this.systemData.data().system_code, 4, "#", "SY"));
    this.systemForm.controls.systemName.setValue(this.systemData.data().system_name);
  }

  getSystemServiceList(){
    this.isFetchingData = true;

    this.maintenanceApi.getSystemServiceList()
      .then(
        (res: any) => {
          // console.log(res);
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
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  gotoService(serviceId: any){
    // console.log(serviceId);

    sessionStorage.setItem("maintenance_service_id", serviceId);
    this.router.navigateByUrl("/modules/maintenance/services/view-service");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.serviceListData = this.aggregateTable.filterData(this.serviceListData, this.filterText, this.tableColumns);
    this.serviceListData = this.aggregateTable.sortData(this.serviceListData, this.sortColumn, this.sortDirection);
    this.serviceListData = this.aggregateTable.paginateData(this.serviceListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "SE");
  }

}
