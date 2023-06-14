import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersPage } from './orders.page';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { AddOrderItemComponent } from './add-order-item/add-order-item.component';
import { EditOrderItemComponent } from './edit-order-item/edit-order-item.component';
import { OrderItemFormComponent } from './order-item-form/order-item-form.component';


@NgModule({
  declarations: [
    OrdersPage,
    AllOrdersComponent,
    AddOrderComponent,
    ViewOrderComponent,
    OrderItemsComponent,
    AddOrderItemComponent,
    EditOrderItemComponent,
    OrderItemFormComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
