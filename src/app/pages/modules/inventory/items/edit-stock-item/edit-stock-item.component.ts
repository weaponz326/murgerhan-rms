import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { StockItem } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { SelectItemCategoryComponent } from 'src/app/components/select-windows/inventory-windows/select-item-category/select-item-category.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { StockItemFormComponent } from '../stock-item-form/stock-item-form.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-edit-stock-item',
  templateUrl: './edit-stock-item.component.html',
  styleUrls: ['./edit-stock-item.component.scss']
})
export class EditStockItemComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
    private formatId: FormatIdService,
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  
  @ViewChild('stockItemFormComponentReference', { read: StockItemFormComponent, static: false }) stockItemForm!: StockItemFormComponent;
  @ViewChild('selectItemCategoryComponentReference', { read: SelectItemCategoryComponent, static: false }) selectItemCategory!: SelectItemCategoryComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  stockItemData: any;
  
  selectedItemCategoryId: any;
  selectedItemCategoryData: any;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingItem = false;
  isDeletingItem = false;

  ngOnInit(): void {
    this.getStockItem();
  }

  getStockItem() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('inventory_category_id') as string;

    this.inventoryApi.getStockItem(id)
      .then((res) => {
        // console.log(res);
        this.stockItemData = res;
        this.isFetchingData = false;
        this.setStockItemData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }
  
  updateStockItem() {    
    this.stockItemForm.isSaved = true;    

    if(this.stockItemForm.stockItemForm.valid){
      this.isSavingItem = true;

      const id = sessionStorage.getItem('inventory_category_id') as string;
      let data = this.setUpdateStockItemData();

      this.inventoryApi.updateStockItem(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingItem = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingItem = false;
        });
    }
  }
  
  deleteStockItem() {
    this.isDeletingItem = true;

    const id = sessionStorage.getItem('inventory_category_id') as string;

    this.inventoryApi.deleteStockItem(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/inventory/items/all-stock-items')
        this.isDeletingItem = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingItem = false;
      });
  }

  setUpdateStockItemData(){
    let data: StockItem = {
      created_at: this.stockItemData.data().created_at,
        updated_at: serverTimestamp(),
        item_code: this.stockItemData.data().item_code,
        item_name: this.stockItemForm.stockItemForm.controls.itemName.value as string,
        total_stock: this.stockItemForm.stockItemForm.controls.totalStock.value as number,
        refill_ordered: this.stockItemForm.stockItemForm.controls.refillOrdered.value as number,
        location: this.stockItemForm.stockItemForm.controls.location.value as string,
        item_category: {
          id: this.selectedItemCategoryId,
          data: {
            category_code: this.selectedItemCategoryData.category_code,
            category_name: this.selectedItemCategoryData.category_name,
          }
        },
        branch: {
          id: this.selectedBranchData.id,
          data: {
            branch_name: this.selectedBranchData.data.branch_name,
            location: this.selectedBranchData.data.location
          }
        },
    }

    // console.log(data);
    return data;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  setStockItemData(){
    this.stockItemForm.stockItemForm.controls.itemCode.setValue(this.formatId.formatId(this.stockItemData.item_code, 5, "#", "SI"));
    this.stockItemForm.stockItemForm.controls.itemName.setValue(this.stockItemData.item_name);
    this.stockItemForm.stockItemForm.controls.itemCategory.setValue(this.stockItemData.item_category.data.category_name);
    this.stockItemForm.stockItemForm.controls.totalStock.setValue(this.stockItemData.total_stock);
    this.stockItemForm.stockItemForm.controls.refillOrdered.setValue(this.stockItemData.refill_ordered);
    this.stockItemForm.stockItemForm.controls.location.setValue(this.stockItemData.location);
    
    this.selectedItemCategoryId = this.stockItemData.item_category.id;
    this.selectedItemCategoryData = this.stockItemData.item_category.data;
  }

  openItemCategoryWindow(){
    // console.log("You are opening select itemcategory window")
    this.selectItemCategory.openModal();
  }

  onItemCategorySelected(categoryData: any){
    // console.log(categoryData);

    this.selectedItemCategoryData = categoryData;
    this.stockItemForm.stockItemForm.controls.itemCategory.setValue(categoryData.data().category_name);

    this.selectedItemCategoryId = categoryData.id;
    this.selectedItemCategoryData = categoryData.data();
  }

}
