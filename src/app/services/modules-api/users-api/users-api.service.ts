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

  getBasicUserWithEmail(email: any){
    return this.usersBasicRef.ref
      .where("email", "==", email)
      .get();
  }

  getBasicUserList(){
    return this.usersBasicRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
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

  getUserRoleList(){
    return this.usersRoleRef.ref
      .orderBy("created_at", "desc")
      .get();
  }

  getBranchUserRoleList(){
    return this.usersRoleRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
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

  getInvitationWithEmail(email: any){
    return this.usersInvitationRef.ref
      .where("invitee_email", "==", email)
      .get();
  }

  getLastInvitation(){
    return this.usersInvitationRef.ref
      .orderBy("created_at", "desc")
      .limit(1)
      .get();
  }

  getInvitationList(){
    return this.usersInvitationRef.ref
      .orderBy("created_at", "desc")
      .get();
  }

  // profile photo

  uploadImage(id: any, image: File): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const filePath = `images/users/${Date.now()}_${image.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, image);
  
      uploadTask
        .then(() => fileRef.getDownloadURL().toPromise())
        .then((downloadUrl) => {
          const data = { profile_photo: downloadUrl };
          return this.updateBasicUser(id, data);
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }
  
  // terms file

  uploadTermsFile(id: any, image: File): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const filePath = `files/users/${Date.now()}_${image.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, image);
  
      uploadTask
        .then(() => fileRef.getDownloadURL().toPromise())
        .then((downloadUrl) => {
          const data = { terms_file: downloadUrl };
          return this.updateBasicUser(id, data);
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

}