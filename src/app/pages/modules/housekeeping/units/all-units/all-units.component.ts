import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-units',
  templateUrl: './all-units.component.html',
  styleUrls: ['./all-units.component.scss']
})
export class AllUnitsComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  unitListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['unit_code', 'unit_name', 'unit_type'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getUnitList();
  }

  getUnitList(){
    this.isFetchingData = true;

    this.housekeepingApi.getUnitList()
      .then(
        (res: any) => {
          console.log(res);
          this.unitListData = res.docs;
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

  viewUnit(unitId: any){
    console.log(unitId);

    sessionStorage.setItem("housekeeping_unit_id", unitId);
    this.router.navigateByUrl("/modules/housekeeping/units/edit-unit");
  }

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.unitListData = this.aggregateTable.filterData(this.unitListData, this.filterText, this.tableColumns);
    this.unitListData = this.aggregateTable.sortData(this.unitListData, this.sortColumn, this.sortDirection);
    this.unitListData = this.aggregateTable.paginateData(this.unitListData, this.currentPage, this.pageSize);
  }

}
