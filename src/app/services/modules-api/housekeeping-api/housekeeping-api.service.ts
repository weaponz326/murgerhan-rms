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
  taskRef = this.firestore.collection('housekeeping_task');
  taskItemRef = this.firestore.collection('housekeeping_task_item');

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
    .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
    .orderBy("created_at")
    .startAt((defaultPageSize * currentPageNumber) + 1)
    .limit(defaultPageSize)
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
    .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
    .orderBy("created_at")
    .startAt((defaultPageSize * currentPageNumber) + 1)
    .limit(defaultPageSize)
    .get();
  }
 
  // task

  createTask(data: any){
    return this.taskRef.add(data);
  }

  updateTask(id:any, data: any){
    return this.taskRef.doc(id).update(data);
  }

  deleteTask(id: any){
    return this.taskRef.doc(id).delete();
  }

  getTask(id: any){
    return this.taskRef.doc(id).ref.get();
  }

  getTaskList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.taskRef.ref
    .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
    .orderBy("created_at")
    .startAt((defaultPageSize * currentPageNumber) + 1)
    .limit(defaultPageSize)
    .get();
  }

  // task items

  createTaskItem(data: any){
    return this.taskItemRef.add(data);
  }

  updateTaskItem(id:any, data: any){
    return this.taskItemRef.doc(id).update(data);
  }

  deleteTaskItem(id: any){
    return this.taskItemRef.doc(id).delete();
  }

  getTaskItem(id: any){
    return this.taskItemRef.doc(id).ref.get();
  }

  getTaskItemList(){
    return this.taskItemRef.ref.get();
  }

}
