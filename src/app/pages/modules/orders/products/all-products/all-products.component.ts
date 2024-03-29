import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  productListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['product_code', 'product_name', 'price'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.isFetchingData = true;

    this.ordersApi.getProductList()
      .then(
        (res: any) => {
          // console.log(res);
          this.productListData = res.docs;
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

  viewProduct(productId: any){
    // console.log(productId);

    sessionStorage.setItem("orders_product_id", productId);
    this.router.navigateByUrl("/modules/orders/products/view-product");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.productListData = this.aggregateTable.filterData(this.productListData, this.filterText, this.tableColumns);
    this.productListData = this.aggregateTable.sortData(this.productListData, this.sortColumn, this.sortDirection);
    this.productListData = this.aggregateTable.paginateData(this.productListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "PR");
  }

}
