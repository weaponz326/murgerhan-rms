import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsPage } from './reports.page';
import { OrdersComponent } from './orders/orders.component';
import { HousekeepingComponent } from './housekeeping/housekeeping.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';


const routes: Routes = [
  { 
    path: "", 
    component: ReportsPage,
    canActivateChild: [() => { return !!localStorage.getItem('uid'); }],
    children: [
      { path: "orders", component: OrdersComponent },
      { path: "housekeeping", component: HousekeepingComponent },
      { path: "attendance", component: AttendanceComponent },
      { path: "inventory", component: InventoryComponent },
      { path: "maintenance", component: MaintenanceComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
