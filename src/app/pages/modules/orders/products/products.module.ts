import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';
import { AllProductsComponent } from './all-products/all-products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ProductFormComponent } from './product-form/product-form.component';


@NgModule({
  declarations: [
    ProductsPage,
    AllProductsComponent,
    NewProductComponent,
    ViewProductComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
