import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { LandingComponent } from './landing/landing.component';

import { authGuard } from 'src/app/guards/auth/auth.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { adminAccessGuard } from 'src/app/guards/access/admin-access/admin-access.guard';
import { managerAccessGuard } from 'src/app/guards/access/manager-access/manager-access.guard';
import { chefAccessGuard } from 'src/app/guards/access/chef-access/chef-access.guard';
import { branchGuard } from 'src/app/guards/branch/branch.guard';
import { headAccessGuard } from 'src/app/guards/access/head-access/head-access.guard';


const routes: Routes = [
  { 
    path: "", 
    component: HomePage, 
    children: [
      // { path: "", component: LandingComponent },
      // { path: "**", component: LandingComponent },
      { path: "landing", component: LandingComponent },
      { path: "access-denied", component: AccessDeniedComponent },

      // admin pages
      {
        path: "modules/admin/dashboard",
        loadChildren: () => import("../modules/admin/dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivateChild: [authGuard, headAccessGuard],
      },
      {
        path: "modules/admin/configuration",
        loadChildren: () => import("../modules/admin/configuration/configuration.module").then(m => m.ConfigurationModule),
        canActivateChild: [authGuard, headAccessGuard],
      },
      {
        path: "modules/admin/branches",
        loadChildren: () => import("../modules/admin/branches/branches.module").then(m => m.BranchesModule),
        canActivateChild: [authGuard, headAccessGuard],
      },
      {
        path: "modules/admin/reports",
        loadChildren: () => import("../modules/admin/reports/reports.module").then(m => m.ReportsModule),
        canActivateChild: [authGuard, headAccessGuard],
      },
      {
        path: "modules/admin/logs",
        loadChildren: () => import("../modules/admin/logs/logs.module").then(m => m.LogsModule),
        canActivateChild: [authGuard, headAccessGuard],
      },

      // users pages
      {
        path: "modules/users/dashboard",
        loadChildren: () => import("../modules/users/dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivateChild: [authGuard, adminAccessGuard],
      },
      {
        path: "modules/users/configuration",
        loadChildren: () => import("../modules/users/configuration/configuration.module").then(m => m.ConfigurationModule),
        canActivateChild: [authGuard, adminAccessGuard],
      },
      {
        path: "modules/users/users",
        loadChildren: () => import("../modules/users/users/users.module").then(m => m.UsersModule),
        canActivateChild: [authGuard, adminAccessGuard],
      },
      {
        path: "modules/users/invitations",
        loadChildren: () => import("../modules/users/invitations/invitations.module").then(m => m.InvitationsModule),
        canActivateChild: [authGuard, adminAccessGuard],
      },

      // orders pages
      {
        path: "modules/orders/dashboard",
        loadChildren: () => import("../modules/orders/dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/orders/configuration",
        loadChildren: () => import("../modules/orders/configuration/configuration.module").then(m => m.ConfigurationModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/orders/products",
        loadChildren: () => import("../modules/orders/products/products.module").then(m => m.ProductsModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/orders/orders",
        loadChildren: () => import("../modules/orders/orders/orders.module").then(m => m.OrdersModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/orders/vendors",
        loadChildren: () => import("../modules/orders/vendors/vendors.module").then(m => m.VendorsModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },

      // housekeeping pages
      {
        path: "modules/housekeeping/dashboard",
        loadChildren: () => import("../modules/housekeeping/dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/housekeeping/configuration",
        loadChildren: () => import("../modules/housekeeping/configuration/configuration.module").then(m => m.ConfigurationModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/housekeeping/tasks",
        loadChildren: () => import("../modules/housekeeping/tasks/tasks.module").then(m => m.TasksModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/housekeeping/units",
        loadChildren: () => import("../modules/housekeeping/units/units.module").then(m => m.UnitsModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/housekeeping/incidents",
        loadChildren: () => import("../modules/housekeeping/incidents/incidents.module").then(m => m.IncidentsModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },

      // attendance pages
      {
        path: "modules/attendance/dashboard",
        loadChildren: () => import("../modules/attendance/dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/attendance/configuration",
        loadChildren: () => import("../modules/attendance/configuration/configuration.module").then(m => m.ConfigurationModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/attendance/roster",
        loadChildren: () => import("../modules/attendance/roster/roster.module").then(m => m.RosterModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/attendance/attendance",
        loadChildren: () => import("../modules/attendance/attendance/attendance.module").then(m => m.AttendanceModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },

      // inventory pages
      {
        path: "modules/inventory/dashboard",
        loadChildren: () => import("../modules/inventory/dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/inventory/configuration",
        loadChildren: () => import("../modules/inventory/configuration/configuration.module").then(m => m.ConfigurationModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/inventory/items",
        loadChildren: () => import("../modules/inventory/items/items.module").then(m => m.ItemsModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/inventory/categories",
        loadChildren: () => import("../modules/inventory/categories/categories.module").then(m => m.CategoriesModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/inventory/suppliers",
        loadChildren: () => import("../modules/inventory/suppliers/suppliers.module").then(m => m.SuppliersModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/inventory/purchasing",
        loadChildren: () => import("../modules/inventory/purchasing/purchasing.module").then(m => m.PurchasingModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },
      {
        path: "modules/inventory/stock-batches",
        loadChildren: () => import("../modules/inventory/stock-batches/stock-batches.module").then(m => m.StockBatchesModule),
        canActivateChild: [authGuard, branchGuard, chefAccessGuard],
      },

      // maintenance pages
      {
        path: "modules/maintenance/dashboard",
        loadChildren: () => import("../modules/maintenance/dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/maintenance/configuration",
        loadChildren: () => import("../modules/maintenance/configuration/configuration.module").then(m => m.ConfigurationModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/maintenance/issues",
        loadChildren: () => import("../modules/maintenance/issues/issues.module").then(m => m.IssuesModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/maintenance/services",
        loadChildren: () => import("../modules/maintenance/services/services.module").then(m => m.ServicesModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/maintenance/contractors",
        loadChildren: () => import("../modules/maintenance/contractors/contractors.module").then(m => m.ContractorsModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },
      {
        path: "modules/maintenance/systems",
        loadChildren: () => import("../modules/maintenance/systems/systems.module").then(m => m.SystemsModule),
        canActivateChild: [authGuard, branchGuard, managerAccessGuard],
      },

      // factory main pages
      {
        path: "modules/factory-main/dashboard",
        loadChildren: () => import("../modules/factory-main/dashboard/dashboard.module").then(m => m.DashboardModule),
      },
      {
        path: "modules/factory-main/factory-items",
        loadChildren: () => import("../modules/factory-main/factory-items/factory-items.module").then(m => m.FactoryItemsModule),
      },
      {
        path: "modules/factory-main/factory-orders",
        loadChildren: () => import("../modules/factory-main/factory-orders/factory-orders.module").then(m => m.FactoryOrdersModule),
      },

      // factory main pages
      {
        path: "modules/branch-factory/dashboard",
        loadChildren: () => import("../modules/branch-factory/dashboard/dashboard.module").then(m => m.DashboardModule),
      },
      {
        path: "modules/branch-factory/branch-orders",
        loadChildren: () => import("../modules/branch-factory/branch-orders/branch-orders.module").then(m => m.BranchOrdersModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
