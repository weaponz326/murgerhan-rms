import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  usersBasicRef = this.firestore.collection('users_user_basic_profile');
  usersAdditionalRef = this.firestore.collection('users_user_additional_profile');
  usersAvailabilityRef = this.firestore.collection('users_user_availability');
  usersRoleRef = this.firestore.collection('users_role');
  usersInvitationRef = this.firestore.collection('users_invitation');

  // user basic profile

  createBasicUser(data: any){
    return this.usersBasicRef.add(data);
  }

  updateBasicUser(id:any, data: any){
    return this.usersBasicRef.doc(id).update(data);
  }

  deleteBasicUser(id: any){
    return this.usersBasicRef.doc(id).delete();
  }

  setBasicUser(id:any, data: any){
    return this.usersBasicRef.doc(id).set(data);
  }

  getBasicUser(id: any){
    return this.usersBasicRef.doc(id).ref.get();
  }

  getBasicUserList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.usersBasicRef.ref
      .where("branch.id", "==", localStorage.getItem("selected_branch"))
      .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
      .get();
  }

  // user additional profile

  createAdditionalUser(data: any){
    return this.usersAdditionalRef.add(data);
  }

  updateAdditionalUser(id:any, data: any){
    return this.usersAdditionalRef.doc(id).update(data);
  }

  deleteAdditionalUser(id: any){
    return this.usersAdditionalRef.doc(id).delete();
  }

  setAdditionalUser(id:any, data: any){
    return this.usersAdditionalRef.doc(id).set(data);
  }

  getAdditionalUser(id: any){
    return this.usersAdditionalRef.doc(id).ref.get();
  }

  getAdditionalUserList(){
    return this.usersAdditionalRef.ref.get();
  }
  
  // user availability

  createAvailability(data: any){
    return this.usersAvailabilityRef.add(data);
  }

  updateAvailability(id:any, data: any){
    return this.usersAvailabilityRef.doc(id).update(data);
  }

  deleteAvailability(id: any){
    return this.usersAvailabilityRef.doc(id).delete();
  }

  setAvailability(id:any, data: any){
    return this.usersAvailabilityRef.doc(id).set(data);
  }
  
  getAvailability(id: any){
    return this.usersAvailabilityRef.doc(id).ref.get();
  }

  getAvailabilityList(){
    return this.usersAvailabilityRef.ref.get();
  }

  // user role

  createUserRole(data: any){
    return this.usersRoleRef.add(data);
  }

  updateUserRole(id:any, data: any){
    return this.usersRoleRef.doc(id).update(data);
  }

  deleteUserRole(id: any){
    return this.usersRoleRef.doc(id).delete();
  }

  setUserRole(id:any, data: any){
    return this.usersRoleRef.doc(id).set(data);
  }

  getUserRole(id: any){
    return this.usersRoleRef.doc(id).ref.get();
  }

  getUserRoleList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.usersRoleRef.ref
    // .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
    .get();
  }

  // invitations

  createInvitation(data: any){
    return this.usersInvitationRef.add(data);
  }

  updateInvitation(id:any, data: any){
    return this.usersInvitationRef.doc(id).update(data);
  }

  deleteInvitation(id: any){
    return this.usersInvitationRef.doc(id).delete();
  }

  getInvitation(id: any){
    return this.usersInvitationRef.doc(id).ref.get();
  }

  getInvitationList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.usersInvitationRef.ref
      .where("branch.id", "==", localStorage.getItem("selected_branch"))
      .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
      .get();
  }

  // profile photo

  uploadImage(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const filePath = `images/users/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(
              (url: string) => resolve(url),
              (error: any) => reject(error)
            );
          })
        ).subscribe();
    });
  }

}