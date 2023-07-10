import { Component, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { SupplierItem } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { SelectStockItemComponent } from 'src/app/components/select-windows/inventory-windows/select-stock-item/select-stock-item.component';


@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.scss']
})
export class SupplierProductsComponent {

  constructor(
    private inventoryApi: InventoryApiService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('selectStockItemComponentReference', { read: SelectStockItemComponent, static: false }) selectStockItem!: SelectStockItemComponent;

  supplierItemListData: any[] = [];
  selectedStockItemData: any;

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  ngOnInit(): void {
    this.getSupplierItemList();
  }

  getSupplierItemList(){
    this.isFetchingData = true;

    this.inventoryApi.getSupplierItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.supplierItemListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createSupplierItem() {
    let data: SupplierItem = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      supplier: sessionStorage.getItem('inventory_supplier_id') as string,
      stock_item: {
        id: this.selectedStockItemData.id,
        data: {
          item_code: this.selectedStockItemData.data().item_code,
          item_name: this.selectedStockItemData.data().item_name,
          unit_price: this.selectedStockItemData.data().unit_price,
        }
      }
    }

    // console.log(data);

    this.inventoryApi.createSupplierItem(data)
      .then((res: any) => {
        // console.log(res);

        if(res.id){
          this.getSupplierItemList();
        }
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
      });
  }

  deleteSupplierItem() {
    this.isItemDeleting = true;

    this.inventoryApi.deleteSupplierItem(this.deleteId)
      .then((res) => {
        // console.log(res);
        this.isItemDeleting = false;
        this.getSupplierItemList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  openItemWindow(){
    // console.log("You are opening select item window")
    this.selectStockItem.openModal();
  }

  onItemSelected(itemData: any){
    // console.log(itemData);
    this.selectedStockItemData = itemData;
    this.createSupplierItem();
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "SI");
  }

}
