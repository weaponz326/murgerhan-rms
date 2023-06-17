import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';


@Component({
  selector: 'app-all-branches',
  templateUrl: './all-branches.component.html',
  styleUrls: ['./all-branches.component.scss']
})
export class AllBranchesComponent {

  constructor(
    private router: Router,
    // private adminApi: AdminApiService,
  ) { }

  branchListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  ngOnInit(): void {
    this.getBranchList();
  }

  getBranchList(){
    this.isFetchingData = true;

    // this.adminApi.getBranchList()
    //   .subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       this.branchListData = res.docs;
    //       this.isFetchingData = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingData = false;
    //     }
    //   )
  }

  editBranch(branchId: any){
    console.log(branchId);

    sessionStorage.setItem("admin_branch_id", branchId);
    this.router.navigateByUrl("/moodules/admin/branches/edit-branch");
  }

}
