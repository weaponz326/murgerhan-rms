import { Component, ViewChild } from '@angular/core';
import { AddOrderComponent } from '../add-order/add-order.component';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent {

  @ViewChild('addOrderComponentReference', { read: AddOrderComponent, static: false }) addOrder!: AddOrderComponent;

}
