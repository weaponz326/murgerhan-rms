import { Component, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { NewRosterComponent } from '../new-roster/new-roster.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-roster',
  templateUrl: './all-roster.component.html',
  styleUrls: ['./all-roster.component.scss']
})
export class AllRosterComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('newRosterComponentReference', { read: NewRosterComponent, static: false }) newRoster!: NewRosterComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  rosterListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['roster_code', 'roster_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getRosterList();
  }

  getRosterList(){
    this.isFetchingData = true;

    this.attendanceApi.getRosterList()
      .then(
        (res: any) => {
          console.log(res);
          this.rosterListData = res.docs;
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

  viewRoster(rosterId: any){
    console.log(rosterId);

    sessionStorage.setItem("attendance_roster_id", rosterId);
    this.router.navigateByUrl("/modules/attendance/roster/view-roster");
  }

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.rosterListData = this.aggregateTable.filterData(this.rosterListData, this.filterText, this.tableColumns);
    this.rosterListData = this.aggregateTable.sortData(this.rosterListData, this.sortColumn, this.sortDirection);
    this.rosterListData = this.aggregateTable.paginateData(this.rosterListData, this.currentPage, this.pageSize);
  }

}
