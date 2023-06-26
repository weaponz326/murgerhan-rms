import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  stockItemRef = this.firestore.collection('inventory_stock_item');
  itemCategoryRef = this.firestore.collection('inventory_item_category');
  categoryChecklistRef = this.firestore.collection('inventory_item_category_checklist');
  supplierRef = this.firestore.collection('inventory_supplier');
  supplierItemRef = this.firestore.collection('inventory_supplier_item');
  purchasingRef = this.firestore.collection('inventory_purchasing');
  purchasingItemRef = this.firestore.collection('inventory_purchasing_item');

  // stock item

  createStockItem(data: any){
    return this.stockItemRef.add(data);
  }

  updateStockItem(id:any, data: any){
    return this.stockItemRef.doc(id).update(data);
  }

  deleteStockItem(id: any){
    return this.stockItemRef.doc(id).delete();
  }

  getStockItem(id: any){
    return this.stockItemRef.doc(id).ref.get();
  }

  getStockItemList(){
    return this.stockItemRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  // item category

  createItemCategory(data: any){
    return this.itemCategoryRef.add(data);
  }

  updateItemCategory(id:any, data: any){
    return this.itemCategoryRef.doc(id).update(data);
  }

  deleteItemCategory(id: any){
    return this.itemCategoryRef.doc(id).delete();
  }

  getItemCategory(id: any){
    return this.itemCategoryRef.doc(id).ref.get();
  }

  getItemCategoryList(){
    return this.itemCategoryRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  // category checklist

  createCategoryChecklist(data: any){
    return this.categoryChecklistRef.add(data);
  }

  updateCategoryChecklist(id:any, data: any){
    return this.categoryChecklistRef.doc(id).update(data);
  }

  deleteCategoryChecklist(id: any){
    return this.categoryChecklistRef.doc(id).delete();
  }

  getCategoryChecklist(id: any){
    return this.categoryChecklistRef.doc(id).ref.get();
  }

  getCategoryChecklistList(){
    return this.categoryChecklistRef.ref
      .where("category", "==", sessionStorage.getItem("inventory_category_id"))
      .orderBy("created_at", "asc")
      .get();
  }

  // supplier

  createSupplier(data: any){
    return this.supplierRef.add(data);
  }

  updateSupplier(id:any, data: any){
    return this.supplierRef.doc(id).update(data);
  }

  deleteSupplier(id: any){
    return this.supplierRef.doc(id).delete();
  }

  getSupplier(id: any){
    return this.supplierRef.doc(id).ref.get();
  }

  getSupplierList(){
    return this.supplierRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  // supplier items

  createSupplierItem(data: any){
    return this.supplierItemRef.add(data);
  }

  updateSupplierItem(id:any, data: any){
    return this.supplierItemRef.doc(id).update(data);
  }

  deleteSupplierItem(id: any){
    return this.supplierItemRef.doc(id).delete();
  }

  getSupplierItem(id: any){
    return this.supplierItemRef.doc(id).ref.get();
  }

  getSupplierItemList(){
    return this.supplierItemRef.ref
      .where("supplier", "==", sessionStorage.getItem("inventory_supplier_id"))
      .orderBy("created_at", "asc")
      .get();
  }

  // purchasing

  createPurchasing(data: any){
    return this.purchasingRef.add(data);
  }

  updatePurchasing(id:any, data: any){
    return this.purchasingRef.doc(id).update(data);
  }

  deletePurchasing(id: any){
    return this.purchasingRef.doc(id).delete();
  }

  getPurchasing(id: any){
    return this.purchasingRef.doc(id).ref.get();
  }

  getPurchasingList(){
    return this.purchasingRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  getSupplierPurchasingList(){
    return this.purchasingRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .where("supplier.id", "==", sessionStorage.getItem("inventory_supplier_id"))
      .orderBy("created_at", "desc")
      .get();
  }

  // purchasing item

  createPurchasingItem(data: any){
    return this.purchasingItemRef.add(data);
  }

  updatePurchasingItem(id:any, data: any){
    return this.purchasingItemRef.doc(id).update(data);
  }

  deletePurchasingItem(id: any){
    return this.purchasingItemRef.doc(id).delete();
  }

  getPurchasingItem(id: any){
    return this.purchasingItemRef.doc(id).ref.get();
  }

  getPurchasingItemList(){
    return this.purchasingItemRef.ref
      .where("purchasing", "==", sessionStorage.getItem("inventory_purchasing_id"))
      .orderBy("created_at", "asc")
      .get();
  }

}
