import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { FactoryItem } from 'src/app/models/modules/factory/factory.model';
import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { FactoryItemFormComponent } from '../factory-item-form/factory-item-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-edit-factory-item',
  templateUrl: './edit-factory-item.component.html',
  styleUrls: ['./edit-factory-item.component.scss']
})
export class EditFactoryItemComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('factoryItemFormComponentReference', { read: FactoryItemFormComponent, static: false }) factoryItemForm!: FactoryItemFormComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  factoryItemData: any;

  isFetchingData = false;
  isSavingItem = false;
  isDeletingItem = false;

  ngOnInit(): void {
    this.getFactoryItem();
  }

  getFactoryItem() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('factory_factory_item_id') as string;

    this.factoryApi.getFactoryItem(id)
      .then((res) => {
        // console.log(res.data());
        this.factoryItemData = res;
        this.isFetchingData = false;
        this.setFactoryItemData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateFactoryItem() {    
    this.factoryItemForm.isSaved = true;
    
    if(this.factoryItemForm.factoryItemForm.valid){
      this.isSavingItem = true;

      const id = sessionStorage.getItem('factory_factory_item_id') as string;
      let data = this.setUpdateFactoryItemData();

      this.factoryApi.updateFactoryItem(id, data)
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

  deleteFactoryItem() {
    this.isDeletingItem = true;

    const id = sessionStorage.getItem('orders_product_id') as string;

    this.factoryApi.deleteFactoryItem(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/factory-main/factory-items/all-factory-items')
        this.isDeletingItem = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingItem = false;
      });
  }

  setFactoryItemData(){
    this.factoryItemForm.factoryItemForm.controls.itemCode.setValue(this.formatId.formatId(this.factoryItemData.data().product_code, 4, "#", "FI"));
    this.factoryItemForm.factoryItemForm.controls.itemName.setValue(this.factoryItemData.data().item_name);
    this.factoryItemForm.factoryItemForm.controls.itemType.setValue(this.factoryItemData.data().item_type);
    this.factoryItemForm.factoryItemForm.controls.price.setValue(this.factoryItemData.data().price);
    this.factoryItemForm.factoryItemForm.controls.description.setValue(this.factoryItemData.data().description);
  }

  setUpdateFactoryItemData(){
    let data: FactoryItem = {
      created_at: this.factoryItemData.data().created_at,
      updated_at: serverTimestamp(),
      item_code: this.factoryItemData.data().item_code,
      item_name: this.factoryItemForm.factoryItemForm.controls.itemName.value as string,
      item_type: this.factoryItemForm.factoryItemForm.controls.itemType.value as string,
      price: this.factoryItemForm.factoryItemForm.controls.price.value as number,
      description: this.factoryItemForm.factoryItemForm.controls.description.value as string,
    }

    // console.log(data);
    return data;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

}
