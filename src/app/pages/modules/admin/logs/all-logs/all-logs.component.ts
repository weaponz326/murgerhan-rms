import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';


@Component({
  selector: 'app-all-logs',
  templateUrl: './all-logs.component.html',
  styleUrls: ['./all-logs.component.scss']
})
export class AllLogsComponent {

  constructor(
    private router: Router,
    private adminApi: AdminApiService,
  ) { }

  logListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  ngOnInit(): void {
    this.getLogList();
  }

  getLogList(){
    this.isFetchingData = true;

    this.adminApi.getLogList()
      .then(
        (res: any) => {
          console.log(res);
          this.logListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.isFetchingData = false;
        }
      )
  }

  viewLogDetails(logId: any){
    console.log(logId);

    sessionStorage.setItem("admin_log_id", logId);
    this.router.navigateByUrl("/modules/admin/logs/log-details");
  }

}
