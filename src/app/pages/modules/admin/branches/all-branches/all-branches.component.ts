import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { SelectBranchComponent } from 'src/app/components/select-windows/admin-windows/select-branch/select-branch.component';


@Component({
  selector: 'app-all-branches',
  templateUrl: './all-branches.component.html',
  styleUrls: ['./all-branches.component.scss']
})
export class AllBranchesComponent {

  constructor(
    private router: Router,
    private adminApi: AdminApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('selectBranchComponentReference', { read: SelectBranchComponent, static: false }) selectBranch!: SelectBranchComponent;

  branchListData: any[] = [];
  
  selectedBranch = "";
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  ngOnInit(): void {
    this.getBranchList();
    this.setBranchName();
  }

  setBranchName(){
    try{ this.selectedBranch = this.selectedBranchData.data.branch_name; }
    catch{ console.log("no branch"); }
  }

  getBranchList(){
    this.isFetchingData = true;

    this.adminApi.getBranchList()
      .then(
        (res: any) => {
          console.log(res);
          this.branchListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  editBranch(branchId: any){
    console.log(branchId);

    sessionStorage.setItem("admin_branch_id", branchId);
    this.router.navigateByUrl("/modules/admin/branches/edit-branch");
  }

  openBranchWindow(){
    console.log("You are opening select branch window")
    this.selectBranch.openModal();
  }

  onBranchSelected(branchData: any){
    console.log(branchData);
    this.selectedBranch = branchData.data().branch_name;
    
    let data = {
      id: branchData.id,
      data: {
        branch_name: branchData.data().branch_name,
        location: branchData.data().location,
      }
    }
    localStorage.setItem("selected_branch", JSON.stringify(data));
  }

}
