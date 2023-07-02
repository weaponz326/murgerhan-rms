import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

// import {
//   Firestore, addDoc, collection, collectionData,
//   doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
// } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  branchRef = this.firestore.collection('admin_branch');
  logRef = this.firestore.collection('admin_activity_log');

  // branch

  createBranch(data: any){
    return this.branchRef.add(data);
  }

  updateBranch(id:any, data: any){
    return this.branchRef.doc(id).update(data);
  }

  deleteBranch(id: any){
    return this.branchRef.doc(id).delete();
  }

  getBranch(id: any){
    return this.branchRef.doc(id).ref.get();
  }

  getBranchList(){
    return this.branchRef.ref.get();
  }

  // activity logs

  createLog(data: any){
    return this.logRef.add(data);
  }

  updateLog(id:any, data: any){
    return this.logRef.doc(id).update(data);
  }

  deleteLog(id: any){
    return this.logRef.doc(id).delete();
  }

  getLog(id: any){
    return this.logRef.doc(id).ref.get();
  }

  getLogList(){
    return this.logRef.ref
      .where("branch.id", "==", localStorage.getItem("selected_branch"))
      .get();
  }

}
