import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { StockItemFormComponent } from '../stock-item-form/stock-item-form.component';
import { serverTimestamp } from 'firebase/firestore';

import { StockItem } from 'src/app/models/modules/inventory/inventory.model';

import { SelectItemCategoryComponent } from 'src/app/components/select-windows/inventory-windows/select-item-category/select-item-category.component';


@Component({
  selector: 'app-edit-stock-item',
  templateUrl: './edit-stock-item.component.html',
  styleUrls: ['./edit-stock-item.component.scss']
})
export class EditStockItemComponent {

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('stockItemFormComponentReference', { read: StockItemFormComponent, static: false }) stockItemForm!: StockItemFormComponent;
  @ViewChild('selectItemCategoryComponentReference', { read: SelectItemCategoryComponent, static: false }) selectItemCategory!: SelectItemCategoryComponent;

  stockItemData: any;
  
  selectedItemCategoryId: any;
  selectedItemCategoryData: any;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isItemSaving = false;
  isItemDeleting = false;

  openModal(data: any){
    this.stockItemData = data;
    this.setStockItemData(data.data());

    this.editButton.nativeElement.click();
  }

  saveItem(){
    this.stockItemForm.isSaved = true;
    
    let data: StockItem = {
      created_at: this.stockItemData.data().created_at,
      updated_at: serverTimestamp(),
      item_code: this.stockItemForm.stockItemForm.controls.itemCode.value as string,
      item_name: this.stockItemForm.stockItemForm.controls.itemName.value as string,
      unit_price: this.stockItemForm.stockItemForm.controls.unitPrice.value as number,
      stock: this.stockItemForm.stockItemForm.controls.stock.value as number,
      refill_ordered: this.stockItemForm.stockItemForm.controls.refillOrdered.value as number,
      location: this.stockItemForm.stockItemForm.controls.location.value as string,
      container: this.stockItemForm.stockItemForm.controls.container.value as string,
      batch_number: this.stockItemForm.stockItemForm.controls.batchNumber.value as string,
      manufacturing_date: this.stockItemForm.stockItemForm.controls.manufacturingDate.value,
      expiry_date: this.stockItemForm.stockItemForm.controls.expiryDate.value,
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

    let item = {
      id: this.stockItemData.id,
      data: data
    }

    if(this.stockItemForm.stockItemForm.valid)
      this.saveItemEvent.emit(item);
  }

  deleteItem(){
    this.deleteItemEvent.emit(this.stockItemData.id);
  }

  setStockItemData(data: any){
    this.stockItemForm.stockItemForm.controls.itemCode.setValue(data.item_code);
    this.stockItemForm.stockItemForm.controls.itemName.setValue(data.item_name);
    this.stockItemForm.stockItemForm.controls.itemCategory.setValue(data.item_category.data.category_name);
    this.stockItemForm.stockItemForm.controls.unitPrice.setValue(data.unit_price);
    this.stockItemForm.stockItemForm.controls.stock.setValue(data.stock);
    this.stockItemForm.stockItemForm.controls.refillOrdered.setValue(data.refill_ordered);
    this.stockItemForm.stockItemForm.controls.location.setValue(data.location);
    this.stockItemForm.stockItemForm.controls.container.setValue(data.container);
    this.stockItemForm.stockItemForm.controls.batchNumber.setValue(data.batch_number);
    this.stockItemForm.stockItemForm.controls.manufacturingDate.setValue(data.manufacturing_date);
    this.stockItemForm.stockItemForm.controls.expiryDate.setValue(data.expiry_date);
    
    this.selectedItemCategoryId = data.item_category.id;
    this.selectedItemCategoryData = data.item_category.data;
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
