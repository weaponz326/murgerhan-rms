import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FactoryApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  factoryItemRef = this.firestore.collection('factory_factory_item');
  factoryOrderRef = this.firestore.collection('factory_order');
  factoryOrderItemRef = this.firestore.collection('factory_order_item');
  factoryVendorOrderRef = this.firestore.collection('factory_vendor_order');
  factoryVendorOrderItemRef = this.firestore.collection('factory_vendor_order_item');

  // factory item

  createFactoryItem(data: any){
    return this.factoryItemRef.add(data);
  }

  updateFactoryItem(id:any, data: any){
    return this.factoryItemRef.doc(id).update(data);
  }

  deleteFactoryItem(id: any){
    return this.factoryItemRef.doc(id).delete();
  }

  getFactoryItem(id: any){
    return this.factoryItemRef.doc(id).ref.get();
  }

  getLastFactoryItem(){
    return this.factoryItemRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
  }

  getFactoryItemList(){
    return this.factoryItemRef.ref
      .orderBy("created_at", "desc")
      .get();
  }

  // factory order

  createOrder(data: any){
    return this.factoryOrderRef.add(data);
  }

  updateOrder(id:any, data: any){
    return this.factoryOrderRef.doc(id).update(data);
  }

  deleteOrder(id: any){
    return this.factoryOrderRef.doc(id).delete();
  }

  getOrder(id: any){
    return this.factoryOrderRef.doc(id).ref.get();
  }

  getLastOrder(){
    return this.factoryOrderRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
  }

  getBranchOrderList(){
    return this.factoryOrderRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  getOrderList(){
    return this.factoryOrderRef.ref
      .orderBy("created_at", "desc")
      .get();
  }

  // order items

  createBranchOrderItem(data: any){
    return this.factoryOrderItemRef.add(data);
  }

  updateBranchOrderItem(id:any, data: any){
    return this.factoryOrderItemRef.doc(id).update(data);
  }

  deleteBranchOrderItem(id: any){
    return this.factoryOrderItemRef.doc(id).delete();
  }

  getBranchOrderItem(id: any){
    return this.factoryOrderItemRef.doc(id).ref.get();
  }

  getBranchOrderItemList(){
    return this.factoryOrderItemRef.ref
      .where("order.id", "==", sessionStorage.getItem('factory_order_id'))
      .orderBy("created_at", "asc")
      .get();
  }

  getMainOrderItemList(){
    return this.factoryOrderItemRef.ref
      .where("order.data.order_date", "==", sessionStorage.getItem('factory_order_date'))
      .get();
  }

  createOrderItemBatch(items: any): Promise<void> {
    const batch = this.firestore.firestore.batch();
    items.forEach((item: any) => {
      const newItemRef = this.factoryOrderItemRef.doc().ref;
      batch.set(newItemRef, item);
    });
    return batch.commit();
  }

  // factory vendor order

  createVendorOrder(data: any){
    return this.factoryVendorOrderRef.add(data);
  }

  updateVendorOrder(id:any, data: any){
    return this.factoryVendorOrderRef.doc(id).update(data);
  }

  deleteVendorOrder(id: any){
    return this.factoryVendorOrderRef.doc(id).delete();
  }

  getVendorOrder(id: any){
    return this.factoryVendorOrderRef.doc(id).ref.get();
  }

  getVendorLastOrder(){
    return this.factoryVendorOrderRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
  }

  getVendorOrderList(){
    return this.factoryVendorOrderRef.ref
      .orderBy("created_at", "desc")
      .get();
  }

  // vendor order items

  createVendorOrderItem(data: any){
    return this.factoryVendorOrderItemRef.add(data);
  }

  updateVendorOrderItem(id:any, data: any){
    return this.factoryVendorOrderItemRef.doc(id).update(data);
  }

  deleteVendorOrderItem(id: any){
    return this.factoryVendorOrderItemRef.doc(id).delete();
  }

  getVendorOrderItem(id: any){
    return this.factoryVendorOrderItemRef.doc(id).ref.get();
  }

  getVendorOrderItemList(){
    return this.factoryVendorOrderItemRef.ref
      .where("vendor.id", "==", sessionStorage.getItem('factory_vendor_order_id'))
      .orderBy("created_at", "asc")
      .get();
  }

}
