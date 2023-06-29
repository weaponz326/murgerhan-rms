import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { AdminWindowsModule } from 'src/app/components/select-windows/admin-windows/admin-windows.module';

import { ReportsPage } from './reports.page';
import { OrdersComponent } from './orders/orders.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { HousekeepingComponent } from './housekeeping/housekeeping.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SelectorComponent } from './selector/selector.component';


@NgModule({
  declarations: [
    ReportsPage,
    OrdersComponent,
    InventoryComponent,
    AttendanceComponent,
    HousekeepingComponent,
    MaintenanceComponent,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReportsRoutingModule,
    ModuleUtilitiesModule,
    AdminWindowsModule
  ],
  providers: [DatePipe]
})
export class ReportsModule { }
