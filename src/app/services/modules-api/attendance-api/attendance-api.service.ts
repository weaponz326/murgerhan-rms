import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AttendanceApiService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  rosterRef = this.firestore.collection('attendance_roster');
  rosterShiftRef = this.firestore.collection('attendance_roster_shift');
  rosterBatchRef = this.firestore.collection('attendance_roster_batch');
  rosterPersonnelRef = this.firestore.collection('attendance_roster_personnel');
  attendanceRef = this.firestore.collection('attendance_attendance');

  // roster

  createRoster(data: any){
    return this.rosterRef.add(data);
  }

  updateRoster(id:any, data: any){
    return this.rosterRef.doc(id).update(data);
  }

  deleteRoster(id: any){
    return this.rosterRef.doc(id).delete();
  }

  getRoster(id: any){
    return this.rosterRef.doc(id).ref.get();
  }

  getRosterList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.rosterRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at")
      .startAt((defaultPageSize * currentPageNumber) + 1)
      .limit(defaultPageSize)
      .get();
  }
 
  // roster shift

  createRosterShift(data: any){
    return this.rosterShiftRef.add(data);
  }

  updateRosterShift(id:any, data: any){
    return this.rosterShiftRef.doc(id).update(data);
  }

  deleteRosterShift(id: any){
    return this.rosterShiftRef.doc(id).delete();
  }

  getRosterShift(id: any){
    return this.rosterShiftRef.doc(id).ref.get();
  }

  getRosterShiftList(){
    return this.rosterShiftRef.ref
      .where("roster", "==", sessionStorage.getItem("attendance_roster_id"))
      .get();
  }
 
  // roster batch

  createRosterBatch(data: any){
    return this.rosterBatchRef.add(data);
  }

  updateRosterBatch(id:any, data: any){
    return this.rosterBatchRef.doc(id).update(data);
  }

  deleteRosterBatch(id: any){
    return this.rosterBatchRef.doc(id).delete();
  }

  getRosterBatch(id: any){
    return this.rosterBatchRef.doc(id).ref.get();
  }

  getRosterBatchList(){
    return this.rosterBatchRef.ref
      .where("roster", "==", sessionStorage.getItem("attendance_roster_id"))
      .get();
  }

  // roster personnel

  createRosterPersonnel(data: any){
    return this.rosterPersonnelRef.add(data);
  }

  updateRosterPersonnel(id:any, data: any){
    return this.rosterPersonnelRef.doc(id).update(data);
  }

  deleteRosterPersonnel(id: any){
    return this.rosterPersonnelRef.doc(id).delete();
  }

  getRosterPersonnel(id: any){
    return this.rosterPersonnelRef.doc(id).ref.get();
  }

  getRosterPersonnelList(){
    return this.rosterPersonnelRef.ref
      .where("roster", "==", sessionStorage.getItem("attendance_roster_id"))
      .get();
  }

  // attendance

  createAttendance(data: any){
    return this.attendanceRef.add(data);
  }

  updateAttendance(id:any, data: any){
    return this.attendanceRef.doc(id).update(data);
  }

  deleteAttendance(id: any){
    return this.attendanceRef.doc(id).delete();
  }

  getAttendance(id: any){
    return this.attendanceRef.doc(id).ref.get();
  }

  getAttendanceList(defaultPageSize: number, currentPageNumber: number, sorting: any, querying: any){
    return this.attendanceRef.ref
    .where("branch.id", "==", localStorage.getItem("selected_branch"))
    .startAt((defaultPageSize * currentPageNumber) + 1).limit(defaultPageSize)
    .get();
  }

}
