import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class HousekeepingApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  unitRef = this.firestore.collection('housekeeping_unit');
  incidentRef = this.firestore.collection('housekeeping_incident');

  // unit

  createUnit(data: any){
    return this.unitRef.add(data);
  }

  updateUnit(id:any, data: any){
    return this.unitRef.doc(id).update(data);
  }

  deleteUnit(id: any){
    return this.unitRef.doc(id).delete();
  }

  getUnit(id: any){
    return this.unitRef.doc(id).ref.get();
  }

  getUnitList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.unitRef.ref
    .where("branch.id", "==", localStorage.getItem("selected_branch"))
    .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
    .get();
  }

  // incident

  createIncident(data: any){
    return this.incidentRef.add(data);
  }

  updateIncident(id:any, data: any){
    return this.incidentRef.doc(id).update(data);
  }

  deleteIncident(id: any){
    return this.incidentRef.doc(id).delete();
  }

  getIncident(id: any){
    return this.incidentRef.doc(id).ref.get();
  }

  getIncidentList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.incidentRef.ref
    .where("branch.id", "==", localStorage.getItem("selected_branch"))
    .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
    .get();
  }
 
}
