import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-contractors',
  templateUrl: './all-contractors.component.html',
  styleUrls: ['./all-contractors.component.scss']
})
export class AllContractorsComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  contractorListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['contractor_code', 'contractor_name', 'phone'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getContractorList();
  }

  getContractorList(){
    this.isFetchingData = true;

    this.maintenanceApi.getContractorList()
      .then(
        (res: any) => {
          // console.log(res);
          this.contractorListData = res.docs;
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

  viewContractor(contractorId: any){
    // console.log(contractorId);

    sessionStorage.setItem("maintenance_contractor_id", contractorId);
    this.router.navigateByUrl("/modules/maintenance/contractors/edit-contractor");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.contractorListData = this.aggregateTable.filterData(this.contractorListData, this.filterText, this.tableColumns);
    this.contractorListData = this.aggregateTable.sortData(this.contractorListData, this.sortColumn, this.sortDirection);
    this.contractorListData = this.aggregateTable.paginateData(this.contractorListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "CT");
  }
  
}
