import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { StockBatch } from 'src/app/models/modules/inventory/inventory.model';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { StockBatchFormComponent } from '../stock-batch-form/stock-batch-form.component';
import { SelectStockItemComponent } from 'src/app/components/select-windows/inventory-windows/select-stock-item/select-stock-item.component';


@Component({
  selector: 'app-add-stock-batch',
  templateUrl: './add-stock-batch.component.html',
  styleUrls: ['./add-stock-batch.component.scss']
})
export class AddStockBatchComponent {

  constructor(
    private inventoryApi: InventoryApiService,
    private formatId: FormatIdService,
  ) { }
  
  @Output() saveBatchEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('stockBatchFormComponentReference', { read: StockBatchFormComponent, static: false }) stockBatchForm!: StockBatchFormComponent;
  @ViewChild('selectStockItemComponentReference', { read: SelectStockItemComponent, static: false }) selectStockItem!: SelectStockItemComponent;

  isFetchingData = false;
  isBatchSaving = false;
  isSaved = false;

  thisId = 0;
  
  selectedStockItemId: any;
  selectedStockItemData: any;
  
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  openModal(){
    this.addButton.nativeElement.click();
    this.getLastStockBatch();
  }

  getLastStockBatch(){
    this.isFetchingData = true;

    this.inventoryApi.getLastStockBatch()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.batch_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.stockBatchForm.stockBatchForm.controls.batchCode.setValue(this.formatId.formatId(this.thisId, 5, "#", "SB"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  saveBatch(){
    this.stockBatchForm.isSaved = true;        

    if(this.stockBatchForm.stockBatchForm.valid && this.selectedStockItemId){
      let data: StockBatch = {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        batch_code: this.thisId,
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

      this.saveBatchEvent.emit(data);
    }
  }

  resetForm(){
    this.stockBatchForm.stockBatchForm.controls.batchCode.setValue('');
    this.stockBatchForm.stockBatchForm.controls.itemCode.setValue('');
    this.stockBatchForm.stockBatchForm.controls.itemName.setValue('');
    this.stockBatchForm.stockBatchForm.controls.unitPrice.setValue(0.00);
    this.stockBatchForm.stockBatchForm.controls.initialStock.setValue(0);
    this.stockBatchForm.stockBatchForm.controls.currentStock.setValue(0);
    this.stockBatchForm.stockBatchForm.controls.location.setValue('');
    this.stockBatchForm.stockBatchForm.controls.container.setValue('');
    this.stockBatchForm.stockBatchForm.controls.batchNumber.setValue('');
    this.stockBatchForm.stockBatchForm.controls.manufacturingDate.setValue(null);
    this.stockBatchForm.stockBatchForm.controls.expiryDate.setValue(null);
    this.selectedStockItemData = null;
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
