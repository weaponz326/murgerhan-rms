import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { StockItem } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { StockItemFormComponent } from '../stock-item-form/stock-item-form.component';
import { SelectItemCategoryComponent } from 'src/app/components/select-windows/inventory-windows/select-item-category/select-item-category.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-add-stock-item',
  templateUrl: './add-stock-item.component.html',
  styleUrls: ['./add-stock-item.component.scss']
})
export class AddStockItemComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
    private formatId: FormatIdService,
  ) { }
  
  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  
  @ViewChild('stockItemFormComponentReference', { read: StockItemFormComponent, static: false }) stockItemForm!: StockItemFormComponent;
  @ViewChild('selectItemCategoryComponentReference', { read: SelectItemCategoryComponent, static: false }) selectItemCategory!: SelectItemCategoryComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isFetchingData = false;
  isSavingItem = false;
  isSaved = false;

  thisId = 0;
  
  selectedItemCategoryId: any;
  selectedItemCategoryData: any;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  ngOnInit(): void {
    this.getLastStockItem();
  }

  getLastStockItem(){
    this.isFetchingData = true;

    this.inventoryApi.getLastStockItem()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.item_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.stockItemForm.stockItemForm.controls.itemCode.setValue(this.formatId.formatId(this.thisId, 5, "#", "SI"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createStockItem() {
    this.stockItemForm.isSaved = true;    

    if(this.stockItemForm.stockItemForm.valid){
      this.isSavingItem = true;

      let data = this.setCreateStockItemData();

      this.inventoryApi.createStockItem(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('inventory_category_id', res.id);
            this.router.navigateByUrl("/modules/inventory/items/view-stock-item");
          }
          this.isSavingItem = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingItem = false;
        });
    } 
  }

  setCreateStockItemData(){
    let data: StockItem = {
      created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        item_code: this.thisId,
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
