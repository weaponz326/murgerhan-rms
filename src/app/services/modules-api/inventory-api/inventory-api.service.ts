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

}
