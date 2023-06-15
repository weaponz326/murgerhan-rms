import { Component, ViewChild } from '@angular/core';
import { EditStockItemComponent } from '../edit-stock-item/edit-stock-item.component';
import { AddStockItemComponent } from '../add-stock-item/add-stock-item.component';

@Component({
  selector: 'app-all-stock-items',
  templateUrl: './all-stock-items.component.html',
  styleUrls: ['./all-stock-items.component.scss']
})
export class AllStockItemsComponent {

  @ViewChild('addStockItemComponentReference', { read: AddStockItemComponent, static: false }) addStockItem!: AddStockItemComponent;
  @ViewChild('editStockItemComponentReference', { read: EditStockItemComponent, static: false }) editStockItem!: EditStockItemComponent;

}
