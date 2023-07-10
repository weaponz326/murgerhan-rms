import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-contractor-history',
  templateUrl: './contractor-history.component.html',
  styleUrls: ['./contractor-history.component.scss']
})
export class ContractorHistoryComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  contractorForm = new FormGroup({
    contractorCode: new FormControl({value: '', disabled: true}),
    contractorName: new FormControl({value: '', disabled: true}),
    contractorType: new FormControl({value: '', disabled: true}),
  })
  
  contractorData: any;
  serviceListData: any[] = [];

  isFetchingData = false;
  isDataAvailable: boolean =  true;

  tableColumns = ['service_code', 'service_subject', 'date_from', 'date_to'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getContractor();
    this.getContractorServiceList();
  }

  getContractor() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('maintenance_contractor_id') as string;

    this.maintenanceApi.getContractor(id)
      .then((res) => {
        // console.log(res);
        this.contractorData = res;
        this.isFetchingData = false;
        this.setContractorData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  setContractorData(){
    this.contractorForm.controls.contractorCode.setValue(this.formatId.formatId(this.contractorData.data().contractor_code, 4, "#", "CT"));
    this.contractorForm.controls.contractorName.setValue(this.contractorData.data().contractor_name);
    this.contractorForm.controls.contractorType.setValue(this.contractorData.data().contractor_type);
  }

  getContractorServiceList(){
    this.isFetchingData = true;

    this.maintenanceApi.getContractorServiceList()
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
