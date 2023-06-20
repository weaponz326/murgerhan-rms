import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

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
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  contractorListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPageSize = 0;
  currentPageNumber = 0;
  defaultPageSize = 25;
  sorting = {
    created_at: "desc",
    log_code: "",
    user: "",
    activity: ""
  };
  querying = {
    created_at: "",
    log_code: "",
    user: "",
    activity: ""
  }

  ngOnInit(): void {
    this.getContractorList();
  }

  getContractorList(){
    this.isFetchingData = true;

    this.maintenanceApi.getContractorList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.contractorListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewContractor(contractorId: any){
    console.log(contractorId);

    sessionStorage.setItem("maintenance_contractor_id", contractorId);
    this.router.navigateByUrl("/modules/maintenance/contractors/view-contractor");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getContractorList();
  }

}
