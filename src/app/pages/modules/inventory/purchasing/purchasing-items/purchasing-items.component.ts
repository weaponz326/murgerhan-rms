import { Component, ViewChild } from '@angular/core';
import { AddPurchasingItemComponent } from '../add-purchasing-item/add-purchasing-item.component';
import { EditPurchasingItemComponent } from '../edit-purchasing-item/edit-purchasing-item.component';

@Component({
  selector: 'app-purchasing-items',
  templateUrl: './purchasing-items.component.html',
  styleUrls: ['./purchasing-items.component.scss']
})
export class PurchasingItemsComponent {

  @ViewChild('addPurchasingItemComponentReference', { read: AddPurchasingItemComponent, static: false }) addPurchasingItem!: AddPurchasingItemComponent;
  @ViewChild('editPurchasingItemComponentReference', { read: EditPurchasingItemComponent, static: false }) editPurchasingItem!: EditPurchasingItemComponent;
  
}
