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
  rosterSheetRef = this.firestore.collection('attendance_roster_sheet');
  attendanceRef = this.firestore.collection('attendance_attendance');
  attendancePersonnelRef = this.firestore.collection('attendance_attendance_personnel');

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

  getRosterList(){
    return this.rosterRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
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
      .orderBy("created_at", "asc")
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
      .orderBy("created_at", "asc")
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
      .orderBy("created_at", "asc")
      .get();
  }

  // roster sheet

  createRosterSheet(data: any){
    return this.rosterSheetRef.add(data);
  }

  updateRosterSheet(id:any, data: any){
    return this.rosterSheetRef.doc(id).update(data);
  }

  deleteRosterSheet(id: any){
    return this.rosterSheetRef.doc(id).delete();
  }

  getRosterSheet(id: any){
    return this.rosterSheetRef.doc(id).ref.get();
  }

  getRosterSheetList(){
    return this.rosterSheetRef.ref
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

  getAttendanceList(){
    return this.attendanceRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
      .get();
  }

  // attendance personnel

  createAttendancePersonnel(data: any){
    return this.attendancePersonnelRef.add(data);
  }

  updateAttendancePersonnel(id:any, data: any){
    return this.attendancePersonnelRef.doc(id).update(data);
  }

  deleteAttendancePersonnel(id: any){
    return this.attendancePersonnelRef.doc(id).delete();
  }

  getAttendancePersonnel(id: any){
    return this.attendancePersonnelRef.doc(id).ref.get();
  }

  getAttendancePersonnelList(){
    return this.attendancePersonnelRef.ref
      .where("attendance", "==", sessionStorage.getItem("attendance_attendance_id"))
      .orderBy("created_at", "desc")
      .get();
  }

  createAttendancePersonnelBatch(items: any): Promise<void> {
    const batch = this.firestore.firestore.batch();
    items.forEach((item: any) => {
      const newItemRef = this.attendancePersonnelRef.doc().ref;
      batch.set(newItemRef, item);
    });
    return batch.commit();
  }

}
