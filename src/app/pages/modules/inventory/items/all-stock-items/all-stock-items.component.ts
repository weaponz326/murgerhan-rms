import { Component, ViewChild } from '@angular/core';
import { EditStockItemComponent } from '../edit-stock-item/edit-stock-item.component';
import { AddStockItemComponent } from '../add-stock-item/add-stock-item.component';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
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
    this.getStockItemList();
  }

  getStockItemList(){
    this.isFetchingData = true;

    this.inventoryApi.getStockItemList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.stockItemListData = res;
          this.isFetchingData = false;
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

  updateStockItem(stockitem_item: any) {
    this.editStockItem.isItemSaving = true;
    
    this.inventoryApi.updateStockItem(stockitem_item.id, stockitem_item.data)
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
  
}
