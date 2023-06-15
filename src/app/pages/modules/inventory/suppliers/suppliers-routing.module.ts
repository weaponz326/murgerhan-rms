import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuppliersPage } from './suppliers.page';
import { AllSuppliersComponent } from './all-suppliers/all-suppliers.component';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { SupplierHistoryComponent } from './supplier-history/supplier-history.component';


const routes: Routes = [
  { 
    path: "", 
    component: SuppliersPage,
    children: [
      { path: "", component: AllSuppliersComponent },
      { path: "all-suppliers", component: AllSuppliersComponent },
      { path: "new-supplier", component: NewSupplierComponent },
      { path: "view-supplier", component: ViewSupplierComponent },
      { path: "supplier-history", component: SupplierHistoryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
