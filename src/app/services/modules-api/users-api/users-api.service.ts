import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  userRef = this.firestore.collection('users_user_basic_profile');

  // user basic profile

  createBasicUser(data: any){
    return this.userRef.add(data);
  }

  updateBasicUser(id:any, data: any){
    return this.userRef.doc(id).update(data);
  }

  deleteBasicUser(id: any){
    return this.userRef.doc(id).delete();
  }

  getBasicUser(id: any){
    return this.userRef.doc(id).ref.get();
  }

  getBasicUserList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.userRef.ref
    .where("branch.id", "==", localStorage.getItem("selected_branch"))
    .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
    .get();
  }

  // user additional profile

  createAdditionalUser(data: any){
    return this.userRef.add(data);
  }

  updateAdditionalUser(id:any, data: any){
    return this.userRef.doc(id).update(data);
  }

  deleteAdditionalUser(id: any){
    return this.userRef.doc(id).delete();
  }

  getAdditionalUser(id: any){
    return this.userRef.doc(id).ref.get();
  }

  getAdditionalUserList(){
    return this.userRef.ref.get();
  }
  
  // user availability

  createAvailability(data: any){
    return this.userRef.add(data);
  }

  updateAvailability(id:any, data: any){
    return this.userRef.doc(id).update(data);
  }

  deleteAvailability(id: any){
    return this.userRef.doc(id).delete();
  }

  getAvailability(id: any){
    return this.userRef.doc(id).ref.get();
  }

  getAvailabilityList(){
    return this.userRef.ref.get();
  }

  // user availability

  createUserRole(data: any){
    return this.userRef.add(data);
  }

  updateUserRole(id:any, data: any){
    return this.userRef.doc(id).update(data);
  }

  deleteUserRole(id: any){
    return this.userRef.doc(id).delete();
  }

  getUserRole(id: any){
    return this.userRef.doc(id).ref.get();
  }

  getUserRoleList(){
    return this.userRef.ref.get();
  }

}
