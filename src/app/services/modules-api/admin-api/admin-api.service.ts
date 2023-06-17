import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  // branches

  private collectionName = 'admin/branch';
  private collectionRef: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.collectionRef = this.firestore.collection(this.collectionName);
  }

  createBranch(data: any): Promise<void> {
    const id = this.firestore.createId();
    return this.collectionRef.doc(id).set(data);
  }

  getBranch(id: string): Observable<any> {
    return this.collectionRef.doc(id).valueChanges();
  }

  updateBranch(id: string, data: any): Promise<void> {
    return this.collectionRef.doc(id).update(data);
  }

  deleteBranch(id: string): Promise<void> {
    return this.collectionRef.doc(id).delete();
  }

  getBranchList(): Observable<any[]> {
    return this.collectionRef.valueChanges();
  }

}
