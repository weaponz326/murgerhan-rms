import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-incidents',
  templateUrl: './all-incidents.component.html',
  styleUrls: ['./all-incidents.component.scss']
})
export class AllIncidentsComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  incidentListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['incident_code', 'incident_subject', 'incident_date', 'incident_status'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getIncidentList();
  }

  getIncidentList(){
    this.isFetchingData = true;

    this.housekeepingApi.getIncidentList()
      .then(
        (res: any) => {
          // console.log(res);
          this.incidentListData = res.docs;
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

  viewIncident(incidentId: any){
    // console.log(incidentId);

    sessionStorage.setItem("housekeeping_incident_id", incidentId);
    this.router.navigateByUrl("/modules/housekeeping/incidents/view-incident");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.incidentListData = this.aggregateTable.filterData(this.incidentListData, this.filterText, this.tableColumns);
    this.incidentListData = this.aggregateTable.sortData(this.incidentListData, this.sortColumn, this.sortDirection);
    this.incidentListData = this.aggregateTable.paginateData(this.incidentListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "NC");
  }

}
