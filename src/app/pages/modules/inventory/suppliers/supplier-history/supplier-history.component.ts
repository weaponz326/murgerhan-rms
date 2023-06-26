import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-supplier-history',
  templateUrl: './supplier-history.component.html',
  styleUrls: ['./supplier-history.component.scss']
})
export class SupplierHistoryComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
    private aggregateTable: AggregateTableService,
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  supplierForm = new FormGroup({
    supplierCode: new FormControl({value: '', disabled: true}),
    supplierName: new FormControl({value: '', disabled: true}),
  })

  supplierData: any;
  purchasingListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['purchasing_code', 'purchasing_date', 'total_price'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  ngOnInit(): void {
    this.getSupplier();
    this.getSupplierPurchasingList();
  }

  getSupplier() {
    const id = sessionStorage.getItem('inventory_supplier_id') as string;

    this.inventoryApi.getSupplier(id)
      .then((res) => {
        console.log(res);
        this.supplierData = res;
        this.setSupplierData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      };
  }

  setSupplierData(){
    this.supplierForm.controls.supplierCode.setValue(this.supplierData.data().supplier_code);
    this.supplierForm.controls.supplierName.setValue(this.supplierData.data().supplier_name);
  }

  getSupplierPurchasingList(){
    this.isFetchingData = true;

    this.inventoryApi.getSupplierPurchasingList()
      .then(
        (res: any) => {
          console.log(res);
          this.purchasingListData = res.docs;
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

  gotoPurchasing(purchasingId: any){
    console.log(purchasingId);

    sessionStorage.setItem("inventory_purchasing_id", purchasingId);
    this.router.navigateByUrl("/modules/inventory/purchasing/view-purchasing");
  }

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.purchasingListData = this.aggregateTable.filterData(this.purchasingListData, this.filterText, this.tableColumns);
    this.purchasingListData = this.aggregateTable.sortData(this.purchasingListData, this.sortColumn, this.sortDirection);
    this.purchasingListData = this.aggregateTable.paginateData(this.purchasingListData, this.currentPage, this.pageSize);
  }

}
