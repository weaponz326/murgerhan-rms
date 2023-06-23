import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  maintenanceIssueRef = this.firestore.collection('maintenance_issue');
  maintenanceServiceRef = this.firestore.collection('maintenance_service');
  contractorRef = this.firestore.collection('maintenance_contractor');
  systemRef = this.firestore.collection('maintenance_system');

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

  getIssueList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.maintenanceIssueRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at")
      .startAt((defaultPageSize * currentPageNumber) + 1)
      .limit(defaultPageSize)
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

  getServiceList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.maintenanceServiceRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at")
      .startAt((defaultPageSize * currentPageNumber) + 1)
      .limit(defaultPageSize)
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

  getContractorList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.contractorRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at")
      .startAt((defaultPageSize * currentPageNumber) + 1)
      .limit(defaultPageSize)
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

  getSystemList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.systemRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at")
      .startAt((defaultPageSize * currentPageNumber) + 1)
      .limit(defaultPageSize)
      .get();
  }

}
