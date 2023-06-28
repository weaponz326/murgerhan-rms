import { Component, ViewChild } from '@angular/core';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { EditStockItemComponent } from '../edit-stock-item/edit-stock-item.component';
import { AddStockItemComponent } from '../add-stock-item/add-stock-item.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';


@Component({
  selector: 'app-all-stock-items',
  templateUrl: './all-stock-items.component.html',
  styleUrls: ['./all-stock-items.component.scss']
})
export class AllStockItemsComponent {

  constructor(
    private inventoryApi: InventoryApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addStockItemComponentReference', { read: AddStockItemComponent, static: false }) addStockItem!: AddStockItemComponent;
  @ViewChild('editStockItemComponentReference', { read: EditStockItemComponent, static: false }) editStockItem!: EditStockItemComponent;
  
  stockItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  tableColumns = ['item_code', 'item_name', 'unit_price', 'stock', 'location', 'item_category'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getStockItemList();
  }

  getStockItemList(){
    this.isFetchingData = true;

    this.inventoryApi.getStockItemList()
      .then(
        (res: any) => {
          console.log(res);
          this.stockItemListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.isDataAvailable = false;
          }
          else{
            this.currentPage = 1;
            this.isDataAvailable = true;
          }

          this.aggregateData();
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createStockItem(data: any) {
    this.addStockItem.isItemSaving = true;

    console.log(data);

    this.inventoryApi.createStockItem(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          this.getStockItemList();

          this.addStockItem.isItemSaving = false;
          this.addStockItem.dismissButton.nativeElement.click();
          this.addStockItem.resetForm();
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.addStockItem.isItemSaving = false;
      });
  }

  updateStockItem(item: any) {
    this.editStockItem.isItemSaving = true;
    
    this.inventoryApi.updateStockItem(item.id, item.data)
      .then((res) => {
        console.log(res);
        this.editStockItem.isItemSaving = false;
        this.editStockItem.dismissButton.nativeElement.click();
        this.getStockItemList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.editStockItem.isItemSaving = false;
      });
  }

  deleteStockItem() {
    this.isItemDeleting = true;

    this.inventoryApi.deleteStockItem(this.deleteId)
      .then((res) => {
        console.log(res);
        this.isItemDeleting = false;
        this.getStockItemList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  openEditItem(data: any){
    console.log(data);
    this.editStockItem.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }
  
  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.stockItemListData = this.aggregateTable.filterData(this.stockItemListData, this.filterText, this.tableColumns);
    this.stockItemListData = this.aggregateTable.sortData(this.stockItemListData, this.sortColumn, this.sortDirection);
    this.stockItemListData = this.aggregateTable.paginateData(this.stockItemListData, this.currentPage, this.pageSize);
  }

}
