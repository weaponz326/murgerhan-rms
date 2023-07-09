import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Product } from 'src/app/models/modules/orders/orders.model';
import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ProductFormComponent } from '../product-form/product-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('productFormComponentReference', { read: ProductFormComponent, static: false }) productForm!: ProductFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  productData: any;
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingProduct = false;
  isDeletingProduct = false;

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('orders_product_id') as string;

    this.ordersApi.getProduct(id)
      .then((res) => {
        // console.log(res.data());
        this.productData = res;
        this.isFetchingData = false;
        this.setProductData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateProduct() {    
    this.productForm.isSaved = true;
    
    const id = sessionStorage.getItem('orders_product_id') as string;

    let data: Product = {
      created_at: this.productData.data().created_at,
      updated_at: serverTimestamp(),
      product_code: this.productData.data().product_code,
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

    if(this.productForm.productForm.valid){
      this.isSavingProduct = true;

      this.ordersApi.updateProduct(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingProduct = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingProduct = false;
        });
    }
  }

  deleteProduct() {
    this.isDeletingProduct = true;

    const id = sessionStorage.getItem('orders_product_id') as string;

    this.ordersApi.deleteProduct(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/orders/products/all-products')
        this.isDeletingProduct = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingProduct = false;
      });
  }

  setProductData(){
    this.productForm.productForm.controls.productCode.setValue(this.formatId.formatId(this.productData.data().product_code, 4, "#", "PR"));
    this.productForm.productForm.controls.productName.setValue(this.productData.data().product_name);
    this.productForm.productForm.controls.productType.setValue(this.productData.data().product_type);
    this.productForm.productForm.controls.price.setValue(this.productData.data().price);
    this.productForm.productForm.controls.description.setValue(this.productData.data().description);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
