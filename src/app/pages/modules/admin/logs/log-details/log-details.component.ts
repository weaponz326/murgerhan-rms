import { Component } from '@angular/core';

import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';


@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.scss']
})
export class LogDetailsComponent {

  constructor(
    private adminApi: AdminApiService
  ) {}

  logData: any;

  isFetchingData = false;

  logCode:string = "";
  logDate: any;
  userName: string = "";
  activity: string = "";
  previousEntry: string = "";
  inputedEntry: string = "";

  ngOnInit(): void {
    this.getLog();
  }

  getLog() {
    const id = sessionStorage.getItem('admin_log_id') as string;

    this.adminApi.getLog(id)
      .then((res) => {
        console.log(res);
        this.logData = res;
        this.isFetchingData = false;
        this.setLogData();        
      }),
      (err: any) => {
        console.log(err);
        this.isFetchingData = false;
      };
  }

  setLogData(){
    this.logCode = this.logData.data().log_code;
    this.logDate = this.logData.data().log_date;
    this.userName = this.logData.data().user?.data.full_name;
    this.activity = this.logData.data().activity;
    this.previousEntry = this.logData.data().previous_entry;
    this.inputedEntry = this.logData.data().inputed_entry;
  }

}
