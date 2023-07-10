import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-suppliers',
  templateUrl: './all-suppliers.component.html',
  styleUrls: ['./all-suppliers.component.scss']
})
export class AllSuppliersComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  supplierListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['supplier_code', 'supplier_name', 'phone'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getSupplierList();
  }

  getSupplierList(){
    this.isFetchingData = true;

    this.inventoryApi.getSupplierList()
      .then(
        (res: any) => {
          // console.log(res);
          this.supplierListData = res.docs;
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

  viewSupplier(supplierId: any){
    // console.log(supplierId);

    sessionStorage.setItem("inventory_supplier_id", supplierId);
    this.router.navigateByUrl("/modules/inventory/suppliers/view-supplier");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.supplierListData = this.aggregateTable.filterData(this.supplierListData, this.filterText, this.tableColumns);
    this.supplierListData = this.aggregateTable.sortData(this.supplierListData, this.sortColumn, this.sortDirection);
    this.supplierListData = this.aggregateTable.paginateData(this.supplierListData, this.currentPage, this.pageSize);
  }
 
  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "SU");
  }

}
