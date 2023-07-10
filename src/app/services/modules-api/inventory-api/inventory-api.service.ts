import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  stockItemRef = this.firestore.collection('inventory_stock_item');
  itemCategoryRef = this.firestore.collection('inventory_item_category');
  categoryChecklistRef = this.firestore.collection('inventory_item_category_checklist');
  supplierRef = this.firestore.collection('inventory_supplier');
  supplierItemRef = this.firestore.collection('inventory_supplier_item');
  purchasingRef = this.firestore.collection('inventory_purchasing');
  purchasingItemRef = this.firestore.collection('inventory_purchasing_item');
  purchasingCheckRef = this.firestore.collection('inventory_purchasing_check');
  purchasingCheckImageRef = this.firestore.collection('inventory_purchasing_check_image');

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

  getLastStockItem(){
    return this.stockItemRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
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

  getLastItemCategory(){
    return this.itemCategoryRef.ref
      .orderBy("created_at", "desc")
      .limit(5)
      .get();
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

  getLastSupplier(){
    return this.supplierRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
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

  getLastPurchasing(){
    return this.purchasingRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
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

  // purchasing check

  createPurchasingCheck(data: any){
    return this.purchasingCheckRef.add(data);
  }

  updatePurchasingCheck(id:any, data: any){
    return this.purchasingCheckRef.doc(id).update(data);
  }

  deletePurchasingCheck(id: any){
    return this.purchasingCheckRef.doc(id).delete();
  }

  setPurchasingCheck(id:any, data: any){
    return this.purchasingCheckRef.doc(id).set(data);
  }

  getPurchasingCheck(id: any){
    return this.purchasingCheckRef.doc(id).ref.get();
  }

  getPurchasingChecListk(){
    return this.purchasingCheckRef.ref
      .where("purchasing", "==", sessionStorage.getItem("inventory_purchasing_id"))
      .orderBy("created_at", "asc")
      .get();
  }

  // purchasing check image

  createPurchasingCheckImage(data: any){
    return this.purchasingCheckImageRef.add(data);
  }

  updatePurchasingCheckImage(id:any, data: any){
    return this.purchasingCheckImageRef.doc(id).update(data);
  }

  deletePurchasingCheckImage(id: any){
    return this.purchasingCheckImageRef.doc(id).delete();
  }

  setPurchasingCheckImage(id:any, data: any){
    return this.purchasingCheckImageRef.doc(id).set(data);
  }

  getPurchasingCheckImage(id: any){
    return this.purchasingCheckImageRef.doc(id).ref.get();
  }

  getPurchasingCheckImageList(){
    return this.purchasingCheckImageRef.ref
      .where("purchasing_check", "==", String(sessionStorage.getItem('inventory_purchasing_id')) + String(sessionStorage.getItem('inventory_purchasing_item_id')))
      .orderBy("created_at", "asc")
      .get();
  }

  // image uploads

  uploadPurchasingCheckImage(images: File[], data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const uploadChecks: Promise<string>[] = [];

      images.forEach((image) => {
        const filePath = `images/inventory/purchasing/${Date.now()}_${image.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadCheck = this.storage.upload(filePath, image);

        uploadCheck
          .then(() => fileRef.getDownloadURL().toPromise())
          .then((downloadUrl) => {
            const dataWithImages = { ...data, url: downloadUrl };
            return this.createPurchasingCheckImage(dataWithImages);
          })
          .then(() => uploadChecks.push())
          .catch((error) => reject(error));
      });

      // Wait for all upload issues to complete
      Promise.all(uploadChecks)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

}
