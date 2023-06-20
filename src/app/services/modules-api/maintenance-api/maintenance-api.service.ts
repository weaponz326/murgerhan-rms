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
    .where("branch.id", "==", localStorage.getItem("selected_branch"))
    .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
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
    .where("branch.id", "==", localStorage.getItem("selected_branch"))
    .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
    .get();
  }

}
