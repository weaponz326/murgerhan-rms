import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-factory-items',
  templateUrl: './all-factory-items.component.html',
  styleUrls: ['./all-factory-items.component.scss']
})
export class AllFactoryItemsComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  factoryItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['item_code', 'item_name', 'price', 'item_type'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getFactoryItemList();
  }

  getFactoryItemList(){
    this.isFetchingData = true;

    this.factoryApi.getFactoryItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.factoryItemListData = res.docs;
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

  viewFactoryItem(factoryItemId: any){
    // console.log(factoryItemId);

    sessionStorage.setItem("factory_factory_item", factoryItemId);
    this.router.navigateByUrl("/modules/factory-main/factory-item/view-factory-item");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.factoryItemListData = this.aggregateTable.filterData(this.factoryItemListData, this.filterText, this.tableColumns);
    this.factoryItemListData = this.aggregateTable.sortData(this.factoryItemListData, this.sortColumn, this.sortDirection);
    this.factoryItemListData = this.aggregateTable.paginateData(this.factoryItemListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "FI");
  }

}
