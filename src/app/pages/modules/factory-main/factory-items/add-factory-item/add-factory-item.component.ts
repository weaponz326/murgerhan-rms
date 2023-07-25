import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { FactoryItem } from 'src/app/models/modules/factory/factory.model';
import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { FactoryItemFormComponent } from '../factory-item-form/factory-item-form.component';


@Component({
  selector: 'app-add-factory-item',
  templateUrl: './add-factory-item.component.html',
  styleUrls: ['./add-factory-item.component.scss']
})
export class AddFactoryItemComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('factoryItemFormComponentReference', { read: FactoryItemFormComponent, static: false }) factoryItemForm!: FactoryItemFormComponent;
  
  isFetchingData = false;
  isSavingItem = false;

  thisId = 0;

  ngOnInit(): void {
    this.getLastFactoryItem();
  }

  getLastFactoryItem(){
    this.isFetchingData = true;

    this.factoryApi.getLastFactoryItem()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.item_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.factoryItemForm.factoryItemForm.controls.itemCode.setValue(this.formatId.formatId(this.thisId, 4, "#", "FI"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createFactoryItem() {
    this.factoryItemForm.isSaved = true;
    
    if(this.factoryItemForm.factoryItemForm.valid){
      this.isSavingItem = true;

      let data = this.setCreateProductData();

      this.factoryApi.createFactoryItem(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('factory_factory_item_id', res.id);
            this.router.navigateByUrl("/modules/factory-main/factory-items/view-factory-item");
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

  setCreateProductData(){
    let data: FactoryItem = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      item_code: this.thisId,
      item_name: this.factoryItemForm.factoryItemForm.controls.itemName.value as string,
      item_type: this.factoryItemForm.factoryItemForm.controls.itemType.value as string,
      price: this.factoryItemForm.factoryItemForm.controls.price.value as number,
      description: this.factoryItemForm.factoryItemForm.controls.description.value as string,
    }

    // console.log(data);
    return data;
  }

}
