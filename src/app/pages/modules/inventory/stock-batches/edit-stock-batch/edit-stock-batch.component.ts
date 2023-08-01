import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';
import { StockBatch } from 'src/app/models/modules/inventory/inventory.model';

import { StockBatchFormComponent } from '../stock-batch-form/stock-batch-form.component';
import { SelectStockItemComponent } from 'src/app/components/select-windows/inventory-windows/select-stock-item/select-stock-item.component';


@Component({
  selector: 'app-edit-stock-batch',
  templateUrl: './edit-stock-batch.component.html',
  styleUrls: ['./edit-stock-batch.component.scss']
})
export class EditStockBatchComponent {

  constructor(
    private formatId: FormatIdService,
  ) { }

  @Output() saveBatchEvent = new EventEmitter<any>();
  @Output() deleteBatchEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('stockBatchFormComponentReference', { read: StockBatchFormComponent, static: false }) stockBatchForm!: StockBatchFormComponent;
  @ViewChild('selectStockItemComponentReference', { read: SelectStockItemComponent, static: false }) selectStockItem!: SelectStockItemComponent;

  stockBatchData: any;
  
  selectedStockItemId: any;
  selectedStockItemData: any;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isBatchSaving = false;
  isBatchDeleting = false;

  openModal(data: any){
    this.stockBatchData = data;
    this.setStockBatchData(data.data());

    this.editButton.nativeElement.click();
  }

  saveBatch(){
    this.stockBatchForm.isSaved = true;        

    if(this.stockBatchForm.stockBatchForm.valid && this.selectedStockItemId){
      let data: StockBatch = {
        created_at: this.stockBatchData.data().created_at,
        updated_at: serverTimestamp(),
        batch_code: this.stockBatchData.data().batch_code,
        unit_price: this.stockBatchForm.stockBatchForm.controls.unitPrice.value as number,
        initial_stock: this.stockBatchForm.stockBatchForm.controls.initialStock.value as number,
        current_stock: this.stockBatchForm.stockBatchForm.controls.currentStock.value as number,
        location: this.stockBatchForm.stockBatchForm.controls.location.value as string,
        container: this.stockBatchForm.stockBatchForm.controls.container.value as string,
        batch_number: this.stockBatchForm.stockBatchForm.controls.batchNumber.value as string,
        manufacturing_date: this.stockBatchForm.stockBatchForm.controls.manufacturingDate.value,
        expiry_date: this.stockBatchForm.stockBatchForm.controls.expiryDate.value,
        stock_item: {
          id: this.selectedStockItemId,
          data: {
            item_code: this.selectedStockItemData.item_code,
            item_name: this.selectedStockItemData.item_name,
            item_category: {
              id: this.selectedStockItemData.data.item_category.id,
              data: {
                category_code: this.selectedStockItemData.data.item_category.data.category_code,
                category_name: this.selectedStockItemData.data.item_category.data.category_name,
              }
            },
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
  
      let batch = {
        id: this.stockBatchData.id,
        data: data
      }
      
      this.saveBatchEvent.emit(batch);
    }
  }

  deleteBatch(){
    this.deleteBatchEvent.emit(this.stockBatchData.id);
  }

  setStockBatchData(data: any){
    this.stockBatchForm.stockBatchForm.controls.batchCode.setValue(this.formatId.formatId(data.batch_code, 5, "#", "SB"));
    this.stockBatchForm.stockBatchForm.controls.itemCode.setValue(data.stock_item.data.item_code);
    this.stockBatchForm.stockBatchForm.controls.itemName.setValue(data.stock_item.data.item_name);
    this.stockBatchForm.stockBatchForm.controls.itemCategory.setValue(data.stock_item.data.item_category.data.category_name);
    this.stockBatchForm.stockBatchForm.controls.unitPrice.setValue(data.unit_price);
    this.stockBatchForm.stockBatchForm.controls.initialStock.setValue(data.initial_stock);
    this.stockBatchForm.stockBatchForm.controls.currentStock.setValue(data.current_stock);
    this.stockBatchForm.stockBatchForm.controls.location.setValue(data.location);
    this.stockBatchForm.stockBatchForm.controls.container.setValue(data.container);
    this.stockBatchForm.stockBatchForm.controls.batchNumber.setValue(data.batch_number);
    this.stockBatchForm.stockBatchForm.controls.manufacturingDate.setValue(data.manufacturing_date);
    this.stockBatchForm.stockBatchForm.controls.expiryDate.setValue(data.expiry_date);
    
    this.selectedStockItemId = data.batch_category.id;
    this.selectedStockItemData = data.batch_category.data;
  }

  openStockItemWindow(){
    // console.log("You are opening select stockitem window")
    this.selectStockItem.openModal();
  }

  onStockItemSelected(categoryData: any){
    // console.log(categoryData);

    this.selectedStockItemData = categoryData;
    this.stockBatchForm.stockBatchForm.controls.itemCode.setValue(categoryData.data().item_code);
    this.stockBatchForm.stockBatchForm.controls.itemName.setValue(categoryData.data().item_name);
    this.stockBatchForm.stockBatchForm.controls.itemCategory.setValue(categoryData.data().item_category.data.category_name);

    this.selectedStockItemId = categoryData.id;
    this.selectedStockItemData = categoryData.data();
  }
  
}
