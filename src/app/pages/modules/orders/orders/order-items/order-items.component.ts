import { Component, ViewChild } from '@angular/core';
import { AddOrderItemComponent } from '../add-order-item/add-order-item.component';
import { EditOrderItemComponent } from '../edit-order-item/edit-order-item.component';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss']
})
export class OrderItemsComponent {

  @ViewChild('addOrderItemComponentReference', { read: AddOrderItemComponent, static: false }) addOrderItem!: AddOrderItemComponent;
  @ViewChild('editOrderItemComponentReference', { read: EditOrderItemComponent, static: false }) editOrderItem!: EditOrderItemComponent;
  
}
