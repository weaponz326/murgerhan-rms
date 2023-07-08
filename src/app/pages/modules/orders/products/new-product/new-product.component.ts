import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Product } from 'src/app/models/modules/orders/orders.model';
import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { ProductFormComponent } from '../product-form/product-form.component';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('productFormComponentReference', { read: ProductFormComponent, static: false }) productForm!: ProductFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isSavingProduct = false;

  createProduct() {
    this.productForm.isSaved = true;
    
    let data: Product = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      product_code: this.productForm.productForm.controls.productCode.value as string,
      product_name: this.productForm.productForm.controls.productName.value as string,
      product_type: this.productForm.productForm.controls.productType.value as string,
      price: this.productForm.productForm.controls.price.value as number,
      description: this.productForm.productForm.controls.description.value as string,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    // console.log(data);

    if(this.productForm.productForm.valid){
      this.isSavingProduct = true;

      this.ordersApi.createProduct(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('orders_product_id', res.id);
            this.router.navigateByUrl("/modules/orders/products/view-product");
          }
          this.isSavingProduct = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingProduct = false;
        });
    }
  }
  
}
