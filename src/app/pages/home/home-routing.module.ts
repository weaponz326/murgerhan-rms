import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';


const routes: Routes = [
  { 
    path: "", 
    component: HomePage, 
    children: [
      // admin pages
      {
        path: "modules/admin/dashboard",
        loadChildren: () => import("../modules/admin/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "modules/admin/configuration",
        loadChildren: () => import("../modules/admin/configuration/configuration.module").then(m => m.ConfigurationModule)
      },
      {
        path: "modules/admin/branches",
        loadChildren: () => import("../modules/admin/branches/branches.module").then(m => m.BranchesModule)
      },
      {
        path: "modules/admin/reports",
        loadChildren: () => import("../modules/admin/reports/reports.module").then(m => m.ReportsModule)
      },
      {
        path: "modules/admin/logs",
        loadChildren: () => import("../modules/admin/logs/logs.module").then(m => m.LogsModule)
      },

      // users pages
      {
        path: "modules/users/dashboard",
        loadChildren: () => import("../modules/users/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "modules/users/configuration",
        loadChildren: () => import("../modules/users/configuration/configuration.module").then(m => m.ConfigurationModule)
      },
      {
        path: "modules/users/users",
        loadChildren: () => import("../modules/users/users/users.module").then(m => m.UsersModule)
      },
      {
        path: "modules/users/invitations",
        loadChildren: () => import("../modules/users/invitations/invitations.module").then(m => m.InvitationsModule)
      },

      // orders pages
      {
        path: "modules/orders/dashboard",
        loadChildren: () => import("../modules/orders/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "modules/orders/configuration",
        loadChildren: () => import("../modules/orders/configuration/configuration.module").then(m => m.ConfigurationModule)
      },
      {
        path: "modules/orders/products",
        loadChildren: () => import("../modules/orders/products/products.module").then(m => m.ProductsModule)
      },
      {
        path: "modules/orders/orders",
        loadChildren: () => import("../modules/orders/orders/orders.module").then(m => m.OrdersModule)
      },
      {
        path: "modules/orders/vendors",
        loadChildren: () => import("../modules/orders/vendors/vendors.module").then(m => m.VendorsModule)
      },
      {
        path: "modules/orders/invoice",
        loadChildren: () => import("../modules/orders/invoice/invoice.module").then(m => m.InvoiceModule)
      },

      // housekeeping pages
      {
        path: "modules/housekeeping/dashboard",
        loadChildren: () => import("../modules/housekeeping/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "modules/housekeeping/configuration",
        loadChildren: () => import("../modules/housekeeping/configuration/configuration.module").then(m => m.ConfigurationModule)
      },
      {
        path: "modules/housekeeping/tasks",
        loadChildren: () => import("../modules/housekeeping/tasks/tasks.module").then(m => m.TasksModule)
      },
      {
        path: "modules/housekeeping/units",
        loadChildren: () => import("../modules/housekeeping/units/units.module").then(m => m.UnitsModule)
      },
      {
        path: "modules/housekeeping/schedules",
        loadChildren: () => import("../modules/housekeeping/schedules/schedules.module").then(m => m.SchedulesModule)
      },
      {
        path: "modules/housekeeping/incidents",
        loadChildren: () => import("../modules/housekeeping/incidents/incidents.module").then(m => m.IncidentsModule)
      },

      // attendance pages
      {
        path: "modules/attendance/dashboard",
        loadChildren: () => import("../modules/attendance/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "modules/attendance/configuration",
        loadChildren: () => import("../modules/attendance/configuration/configuration.module").then(m => m.ConfigurationModule)
      },
      {
        path: "modules/attendance/roster",
        loadChildren: () => import("../modules/attendance/roster/roster.module").then(m => m.RosterModule)
      },
      {
        path: "modules/attendance/attendance",
        loadChildren: () => import("../modules/attendance/attendance/attendance.module").then(m => m.AttendanceModule)
      },

      // inventory pages
      {
        path: "modules/inventory/dashboard",
        loadChildren: () => import("../modules/inventory/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "modules/inventory/configuration",
        loadChildren: () => import("../modules/inventory/configuration/configuration.module").then(m => m.ConfigurationModule)
      },
      {
        path: "modules/inventory/items",
        loadChildren: () => import("../modules/inventory/items/items.module").then(m => m.ItemsModule)
      },
      {
        path: "modules/inventory/categories",
        loadChildren: () => import("../modules/inventory/categories/categories.module").then(m => m.CategoriesModule)
      },
      {
        path: "modules/inventory/suppliers",
        loadChildren: () => import("../modules/inventory/suppliers/suppliers.module").then(m => m.SuppliersModule)
      },
      {
        path: "modules/inventory/purchasing",
        loadChildren: () => import("../modules/inventory/purchasing/purchasing.module").then(m => m.PurchasingModule)
      },

      // maintenance pages
      {
        path: "modules/maintenance/dashboard",
        loadChildren: () => import("../modules/maintenance/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "modules/maintenance/configuration",
        loadChildren: () => import("../modules/maintenance/configuration/configuration.module").then(m => m.ConfigurationModule)
      },
      {
        path: "modules/maintenance/services",
        loadChildren: () => import("../modules/maintenance/services/services.module").then(m => m.ServicesModule)
      },
      {
        path: "modules/maintenance/contractors",
        loadChildren: () => import("../modules/maintenance/contractors/contractors.module").then(m => m.ContractorsModule)
      },
      {
        path: "modules/maintenance/systems",
        loadChildren: () => import("../modules/maintenance/systems/systems.module").then(m => m.SystemsModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
