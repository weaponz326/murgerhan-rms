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

  // task

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

}
