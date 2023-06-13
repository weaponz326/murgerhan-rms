import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsPage } from './reports.page';
import { OrdersComponent } from './orders/orders.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { HousekeepingComponent } from './housekeeping/housekeeping.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';


@NgModule({
  declarations: [
    ReportsPage,
    OrdersComponent,
    InventoryComponent,
    AttendanceComponent,
    HousekeepingComponent,
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
