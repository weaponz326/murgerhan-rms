import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsPage } from './products.page';
import { AllProductsComponent } from './all-products/all-products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ViewProductComponent } from './view-product/view-product.component';

import { viewProductGuard } from 'src/app/guards/modules/orders/view-product/view-product.guard';


const routes: Routes = [
  { 
    path: "", 
    component: ProductsPage,
    children: [
      { path: "", component: AllProductsComponent },
      { path: "all-products", component: AllProductsComponent },
      { path: "new-product", component: NewProductComponent },
      { path: "view-product", component: ViewProductComponent, canActivate: [viewProductGuard] },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
