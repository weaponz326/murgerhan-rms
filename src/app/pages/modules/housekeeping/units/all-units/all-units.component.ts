import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';
import { Unit } from 'src/app/models/modules/housekeeping/housekeeping.model';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { SelectBranchComponent } from 'src/app/components/select-windows/admin-windows/select-branch/select-branch.component';


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
    private formatId: FormatIdService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('selectBranchComponentReference', { read: SelectBranchComponent, static: false }) selectBranch!: SelectBranchComponent;
  @ViewChild('confirmButtonElementReference', { read: ElementRef, static: false }) confirmButtonElement!: ElementRef;

  unitListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['unit_code', 'unit_name', 'unit_type'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 25;

  importBranchId: any;
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  lastId = 0;

  ngOnInit(): void {
    this.getUnitList();
  }

  getUnitList(){
    this.isFetchingData = true;

    this.housekeepingApi.getUnitList()
      .then(
        (res: any) => {
          // console.log(res);
          this.unitListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.currentPage = 0;
            this.isDataAvailable = false;
          }

          this.aggregateData();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getBranchUnitList(){
    this.housekeepingApi.getBranchUnitList(this.importBranchId)
      .then(
        (res: any) => {
          // console.log(res.docs);
          this.setUnitBatchData(res.docs);
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
        }
      )
  }

  createCopyUnitBatch(data: any) {         
    this.housekeepingApi.createCopyUnitBatch(data)
      .then((res: any) => {
        console.log(res);
        this.getUnitList();
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
      });
  }

  getLastUnit(){
    this.housekeepingApi.getLastUnit()
      .then(
        (res: any) => {
          // console.log(res.docs[0]);
          if(res.docs[0])
            this.lastId = res.docs[0]?.data()?.unit_code;        
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewUnit(unitId: any){
    // console.log(unitId);

    sessionStorage.setItem("housekeeping_unit_id", unitId);
    this.router.navigateByUrl("/modules/housekeeping/units/edit-unit");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.unitListData = this.aggregateTable.filterData(this.unitListData, this.filterText, this.tableColumns);
    this.unitListData = this.aggregateTable.sortData(this.unitListData, this.sortColumn, this.sortDirection);
    this.unitListData = this.aggregateTable.paginateData(this.unitListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "UT");
  }

  openBranchWindow(){
    // console.log("You are opening select branch window")
    this.selectBranch.openModal();
    this.getLastUnit();
  }

  onBranchSelected(data: any){
    // console.log(data);
    this.importBranchId = data.id;
    this.openConfirmModal();
  }

  openConfirmModal(){
    this.confirmButtonElement.nativeElement.click();
  }

  onConfirm() {
    // console.log('import confirmed...');
    this.getBranchUnitList();
  }

  setUnitBatchData(units: any){
    let newUnitList: any[] = [];

    units.forEach((unit: any) => {
      // Create a new unit document with a different branch
      // const newUnit = { ...unit };
      const newUnit: Unit = {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        unit_code: this.lastId++,
        unit_name: unit.data().unit_name,
        unit_type: unit.data().unit_type,
        location: unit.data().location,
        condition: unit.data().condition,
        description: unit.data().description,
        branch: {
          id: this.selectedBranchData.id,
          data: {
            branch_name: this.selectedBranchData.data.branch_name,
            location: this.selectedBranchData.data.location,
          }
        }
      }
      
      newUnitList.push(newUnit);
    });

    // console.log(newUnitList);
    this.createCopyUnitBatch(newUnitList);
  }

}
