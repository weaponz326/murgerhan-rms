import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceApiService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  maintenanceIssueRef = this.firestore.collection('maintenance_issue');
  maintenanceIssueImageRef = this.firestore.collection('maintenance_issue_image');
  maintenanceServiceRef = this.firestore.collection('maintenance_service');
  contractorRef = this.firestore.collection('maintenance_contractor');
  systemRef = this.firestore.collection('maintenance_system');
  systemImageRef = this.firestore.collection('maintenance_system_image');
  // issue

  createIssue(data: any){
    return this.maintenanceIssueRef.add(data);
  }

  updateIssue(id:any, data: any){
    return this.maintenanceIssueRef.doc(id).update(data);
  }

  deleteIssue(id: any){
    return this.maintenanceIssueRef.doc(id).delete();
  }

  getIssue(id: any){
    return this.maintenanceIssueRef.doc(id).ref.get();
  }

  getLastIssue(){
    return this.maintenanceIssueRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }
  
  getIssueList(){
    return this.maintenanceIssueRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  getUserIssueList(id: any){
    return this.maintenanceIssueRef.ref
      .where("reported_to.id", "==", id)
      .orderBy("created_at", "desc")
      .get();
  }

  getSystemIssueList(){
    return this.maintenanceIssueRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .where("system.id", "==", sessionStorage.getItem("maintenance_system_id"))
      .orderBy("created_at", "desc")
      .get();
  }

  // issue image

  createIssueImage(data: any){
    return this.maintenanceIssueImageRef.add(data);
  }

  updateIssueImage(id:any, data: any){
    return this.maintenanceIssueImageRef.doc(id).update(data);
  }

  deleteIssueImage(id: any){
    return this.maintenanceIssueImageRef.doc(id).delete();
  }

  getIssueImage(id: any){
    return this.maintenanceIssueImageRef.doc(id).ref.get();
  }

  getIssueImageList(){
    return this.maintenanceIssueImageRef.ref
      .where("issue", "==", sessionStorage.getItem("maintenance_issue_id"))
      .orderBy("created_at", "desc")
      .get();
  }
  
  // service

  createService(data: any){
    return this.maintenanceServiceRef.add(data);
  }

  updateService(id:any, data: any){
    return this.maintenanceServiceRef.doc(id).update(data);
  }

  deleteService(id: any){
    return this.maintenanceServiceRef.doc(id).delete();
  }

  getService(id: any){
    return this.maintenanceServiceRef.doc(id).ref.get();
  }

  getLastService(){
    return this.maintenanceServiceRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  getServiceList(){
    return this.maintenanceServiceRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  getSystemServiceList(){
    return this.maintenanceServiceRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .where("system.id", "==", sessionStorage.getItem("maintenance_system_id"))
      .orderBy("created_at", "desc")
      .get();
  }

  getContractorServiceList(){
    return this.maintenanceServiceRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .where("contractor.id", "==", sessionStorage.getItem("maintenance_contractor_id"))
      .orderBy("created_at", "desc")
      .get();
  }

  // contractor

  createContractor(data: any){
    return this.contractorRef.add(data);
  }

  updateContractor(id:any, data: any){
    return this.contractorRef.doc(id).update(data);
  }

  deleteContractor(id: any){
    return this.contractorRef.doc(id).delete();
  }

  getContractor(id: any){
    return this.contractorRef.doc(id).ref.get();
  }

  getLastContractor(){
    return this.contractorRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  getContractorList(){
    return this.contractorRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  // system

  createSystem(data: any){
    return this.systemRef.add(data);
  }

  updateSystem(id:any, data: any){
    return this.systemRef.doc(id).update(data);
  }

  deleteSystem(id: any){
    return this.systemRef.doc(id).delete();
  }

  getSystem(id: any){
    return this.systemRef.doc(id).ref.get();
  }

  getLastSystem(){
    return this.systemRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  getSystemList(){
    return this.systemRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  // system image

  createSystemImage(data: any){
    return this.systemImageRef.add(data);
  }

  updateSystemImage(id:any, data: any){
    return this.systemImageRef.doc(id).update(data);
  }

  deleteSystemImage(id: any){
    return this.systemImageRef.doc(id).delete();
  }

  getSystemImage(id: any){
    return this.systemImageRef.doc(id).ref.get();
  }

  getSystemImageList(){
    return this.systemImageRef.ref
      .where("system", "==", sessionStorage.getItem("maintenance_system_id"))
      .orderBy("created_at", "desc")
      .get();
  }

  // image uploads

  uploadIssueImage(images: File[], data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const uploadIssues: Promise<string>[] = [];

      images.forEach((image) => {
        const filePath = `images/maintenance/issue/${Date.now()}_${image.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadIssue = this.storage.upload(filePath, image);

        uploadIssue
          .then(() => fileRef.getDownloadURL().toPromise())
          .then((downloadUrl) => {
            const dataWithImages = { ...data, url: downloadUrl };
            return this.createIssueImage(dataWithImages);
          })
          .then(() => uploadIssues.push())
          .catch((error) => reject(error));
      });

      // Wait for all upload issues to complete
      Promise.all(uploadIssues)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  uploadSystemImage(images: File[], data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const uploadIssues: Promise<string>[] = [];

      images.forEach((image) => {
        const filePath = `images/maintenance/system/${Date.now()}_${image.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadIssue = this.storage.upload(filePath, image);

        uploadIssue
          .then(() => fileRef.getDownloadURL().toPromise())
          .then((downloadUrl) => {
            const dataWithImages = { ...data, url: downloadUrl };
            return this.createSystemImage(dataWithImages);
          })
          .then(() => uploadIssues.push())
          .catch((error) => reject(error));
      });

      // Wait for all upload issues to complete
      Promise.all(uploadIssues)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

}
