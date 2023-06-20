import { Component, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { VendorProduct } from 'src/app/models/modules/orders/orders.model';
import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';


@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.scss']
})
export class VendorProductsComponent {

  constructor(
    private ordersApi: OrdersApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  vendorProductListData: any[] = [];
  selectedProductData: any;
  vendorData: any;

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  ngOnInit(): void {
    this.getVendorProductList();
  }

  getVendorProductList(){
    this.isFetchingData = true;

    this.ordersApi.getVendorProductList()
      .then(
        (res: any) => {
          console.log(res);
          this.vendorProductListData = res;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createVendorProduct() {
    let data: VendorProduct = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      vendor: {
        id: this.vendorData.id,
        data: {
          vendor_code: this.vendorData.data.vendor_code,
          vendor_name: this.vendorData.data.vendor_name,
        } 
      },
      product: {
        id: this.selectedProductData.id,
        data: {
          product_code: this.selectedProductData.data.product_code,
          product_name: this.selectedProductData.data.product_name,
          price: this.selectedProductData.data.price,
        }
      }
    }

    console.log(data);

    this.ordersApi.createVendorProduct(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          this.getVendorProductList();
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      });
  }

  deleteVendorProduct() {
    this.isItemDeleting = true;

    this.ordersApi.deleteVendorProduct(this.deleteId)
      .then((res) => {
        console.log(res);
        this.isItemDeleting = false;
        this.getVendorProductList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }
  
}
