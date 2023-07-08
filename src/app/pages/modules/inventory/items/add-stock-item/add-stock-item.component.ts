import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { StockItem } from 'src/app/models/modules/inventory/inventory.model';

import { StockItemFormComponent } from '../stock-item-form/stock-item-form.component';
import { SelectItemCategoryComponent } from 'src/app/components/select-windows/inventory-windows/select-item-category/select-item-category.component';


@Component({
  selector: 'app-add-stock-item',
  templateUrl: './add-stock-item.component.html',
  styleUrls: ['./add-stock-item.component.scss']
})
export class AddStockItemComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('stockItemFormComponentReference', { read: StockItemFormComponent, static: false }) stockItemForm!: StockItemFormComponent;
  @ViewChild('selectItemCategoryComponentReference', { read: SelectItemCategoryComponent, static: false }) selectItemCategory!: SelectItemCategoryComponent;

  isItemSaving = false;

  selectedItemCategoryId: any;
  selectedItemCategoryData: any;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  openModal(){
    this.addButton.nativeElement.click();
  }

  saveItem(){
    this.stockItemForm.isSaved = true;
    
    let data: StockItem = {
      created_at: serverTimestamp(),
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

    if(this.stockItemForm.stockItemForm.valid)
      this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.stockItemForm.stockItemForm.controls.itemCode.setValue('');
    this.stockItemForm.stockItemForm.controls.itemName.setValue('');
    this.stockItemForm.stockItemForm.controls.itemCategory.setValue('');
    this.stockItemForm.stockItemForm.controls.unitPrice.setValue(0.00);
    this.stockItemForm.stockItemForm.controls.stock.setValue(0);
    this.stockItemForm.stockItemForm.controls.refillOrdered.setValue(0);
    this.stockItemForm.stockItemForm.controls.location.setValue('');
    this.stockItemForm.stockItemForm.controls.container.setValue('');
    this.stockItemForm.stockItemForm.controls.batchNumber.setValue('');
    this.stockItemForm.stockItemForm.controls.manufacturingDate.setValue(null);
    this.stockItemForm.stockItemForm.controls.expiryDate.setValue(null);
    this.selectedItemCategoryData = null;
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
