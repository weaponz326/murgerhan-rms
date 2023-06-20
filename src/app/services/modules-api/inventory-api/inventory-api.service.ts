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

  getStockItemList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.stockItemRef.ref
    .where("branch.id", "==", localStorage.getItem("selected_branch"))
    .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
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

  getItemCategoryList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.itemCategoryRef.ref
    .where("branch.id", "==", localStorage.getItem("selected_branch"))
    .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
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
    return this.categoryChecklistRef.ref.get();
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

  getSupplierList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.supplierRef.ref
    .where("branch.id", "==", localStorage.getItem("selected_branch"))
    .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
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
    return this.supplierItemRef.ref.get();
  }

}
