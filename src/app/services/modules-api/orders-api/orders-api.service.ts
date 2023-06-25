import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  productRef = this.firestore.collection('orders_product');
  orderRef = this.firestore.collection('orders_order');
  orderItemRef = this.firestore.collection('orders_order_item');
  vendorRef = this.firestore.collection('orders_vendor');
  vendorProductRef = this.firestore.collection('orders_vendor_product');

  // product

  createProduct(data: any){
    return this.productRef.add(data);
  }

  updateProduct(id:any, data: any){
    return this.productRef.doc(id).update(data);
  }

  deleteProduct(id: any){
    return this.productRef.doc(id).delete();
  }

  getProduct(id: any){
    return this.productRef.doc(id).ref.get();
  }

  // getProductList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
  //   return this.productRef.ref
  //     .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
  //     .orderBy("created_at", "desc")
  //     .startAt((defaultPageSize * currentPageNumber) + 1)
  //     .limit(defaultPageSize)
  //     .get();
  // }
 
  getProductList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any) {
    let query = this.productRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc");
  
    // if (sorting) {
    //   Object.keys(sorting).forEach((field) => {
    //     query = query.orderBy(field, sorting[field]);
    //   });
    // }
  
    // // Querying
    // if (querying) {
    //   Object.keys(querying).forEach((field) => {
    //     query = query.where(field, "==", querying[field]);
    //   });
    // }
  
    // query = query.startAfter(defaultPageSize * currentPageNumber)
    query = query.endBefore(0)
      .limit(defaultPageSize);
  
    return query.get();
  }
  
  // order

  createOrder(data: any){
    return this.orderRef.add(data);
  }

  updateOrder(id:any, data: any){
    return this.orderRef.doc(id).update(data);
  }

  deleteOrder(id: any){
    return this.orderRef.doc(id).delete();
  }

  getOrder(id: any){
    return this.orderRef.doc(id).ref.get();
  }

  getOrderList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.orderRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at")
      .startAt((defaultPageSize * currentPageNumber) + 1)
      .limit(defaultPageSize)
      .get();
  }

  // order items

  createOrderItem(data: any){
    return this.orderItemRef.add(data);
  }

  updateOrderItem(id:any, data: any){
    return this.orderItemRef.doc(id).update(data);
  }

  deleteOrderItem(id: any){
    return this.orderItemRef.doc(id).delete();
  }

  getOrderItem(id: any){
    return this.orderItemRef.doc(id).ref.get();
  }

  getOrderItemList(){
    return this.orderItemRef.ref
      .where("order", "==", sessionStorage.getItem('orders_order_id'))
      .get();
  }

  // vendor

  createVendor(data: any){
    return this.vendorRef.add(data);
  }

  updateVendor(id:any, data: any){
    return this.vendorRef.doc(id).update(data);
  }

  deleteVendor(id: any){
    return this.vendorRef.doc(id).delete();
  }

  getVendor(id: any){
    return this.vendorRef.doc(id).ref.get();
  }

  getVendorList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.vendorRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at")
      .startAt((defaultPageSize * currentPageNumber) + 1)
      .limit(defaultPageSize)
      .get();
  }

  // vendor products

  createVendorProduct(data: any){
    return this.vendorProductRef.add(data);
  }

  updateVendorProduct(id:any, data: any){
    return this.vendorProductRef.doc(id).update(data);
  }

  deleteVendorProduct(id: any){
    return this.vendorProductRef.doc(id).delete();
  }

  getVendorProduct(id: any){
    return this.vendorProductRef.doc(id).ref.get();
  }

  getVendorProductList(){
    return this.vendorProductRef.ref.get();
  }

}
