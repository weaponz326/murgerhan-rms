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
  
}
