import { Component, ViewChild } from '@angular/core';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddStockBatchComponent } from '../add-stock-batch/add-stock-batch.component';
import { EditStockBatchComponent } from '../edit-stock-batch/edit-stock-batch.component';


@Component({
  selector: 'app-all-stock-batches',
  templateUrl: './all-stock-batches.component.html',
  styleUrls: ['./all-stock-batches.component.scss']
})
export class AllStockBatchesComponent {

  constructor(
    private inventoryApi: InventoryApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addStockBatchComponentReference', { read: AddStockBatchComponent, static: false }) addStockBatch!: AddStockBatchComponent;
  @ViewChild('editStockBatchComponentReference', { read: EditStockBatchComponent, static: false }) editStockBatch!: EditStockBatchComponent;
  
  stockBatchListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isBatchDeleting = false;

  tableColumns = ['batch_code', 'item_name', 'item_code', 'unit_price', 'stock', 'location', 'item_category'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getStockBatchList();
  }

  getStockBatchList(){
    this.isFetchingData = true;

    this.inventoryApi.getStockBatchList()
      .then(
        (res: any) => {
          // console.log(res);
          this.stockBatchListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.currentPage = 0;
            this.isDataAvailable = false;
          }
          else{
            this.currentPage = 1;
            this.isDataAvailable = true;
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

  createStockBatch(data: any) {
    this.addStockBatch.isBatchSaving = true;

    // console.log(data);

    this.inventoryApi.createStockBatch(data)
      .then((res: any) => {
        // console.log(res);

        if(res.id){
          this.getStockBatchList();

          this.addStockBatch.isBatchSaving = false;
          this.addStockBatch.dismissButton.nativeElement.click();
          this.addStockBatch.resetForm();
        }
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.addStockBatch.isBatchSaving = false;
      });
  }

  updateStockBatch(batch: any) {
    this.editStockBatch.isBatchSaving = true;
    
    this.inventoryApi.updateStockBatch(batch.id, batch.data)
      .then((res) => {
        // console.log(res);
        this.editStockBatch.isBatchSaving = false;
        this.editStockBatch.dismissButton.nativeElement.click();
        this.getStockBatchList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.editStockBatch.isBatchSaving = false;
      });
  }

  deleteStockBatch() {
    this.isBatchDeleting = true;

    this.inventoryApi.deleteStockBatch(this.deleteId)
      .then((res) => {
        // console.log(res);
        this.isBatchDeleting = false;
        this.getStockBatchList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isBatchDeleting = false;
      });
  }

  openEditBatch(data: any){
    // console.log(data);
    this.editStockBatch.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }
  
  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.stockBatchListData = this.aggregateTable.filterData(this.stockBatchListData, this.filterText, this.tableColumns);
    this.stockBatchListData = this.aggregateTable.sortData(this.stockBatchListData, this.sortColumn, this.sortDirection);
    this.stockBatchListData = this.aggregateTable.paginateData(this.stockBatchListData, this.currentPage, this.pageSize);
  }

  getBatchFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "SB");
  }

  getStockItemFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "SI");
  }

}
