import { Component, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { SupplierItem } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';


@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.scss']
})
export class SupplierProductsComponent {

  constructor(
    private inventoryApi: InventoryApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  supplierItemListData: any[] = [];
  selectedItemData: any;
  supplierData: any;

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
          console.log(res);
          this.supplierItemListData = res;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createSupplierItem() {
    let data: SupplierItem = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      supplier: {
        id: this.supplierData.id,
        data: {
          supplier_code: this.supplierData.data.supplier_code,
          supplier_name: this.supplierData.data.supplier_name,
        } 
      },
      stock_item: {
        id: this.selectedItemData.id,
        data: {
          item_code: this.selectedItemData.data.item_code,
          item_name: this.selectedItemData.data.item_name,
          unit_price: this.selectedItemData.data.price,
        }
      }
    }

    console.log(data);

    this.inventoryApi.createSupplierItem(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          this.getSupplierItemList();
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      });
  }

  deleteSupplierItem() {
    this.isItemDeleting = true;

    this.inventoryApi.deleteSupplierItem(this.deleteId)
      .then((res) => {
        console.log(res);
        this.isItemDeleting = false;
        this.getSupplierItemList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
