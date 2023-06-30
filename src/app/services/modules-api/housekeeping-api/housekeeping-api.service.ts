import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HousekeepingApiService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  unitRef = this.firestore.collection('housekeeping_unit');
  incidentRef = this.firestore.collection('housekeeping_incident');
  taskRef = this.firestore.collection('housekeeping_task');
  taskItemRef = this.firestore.collection('housekeeping_task_item');
  taskImageRef = this.firestore.collection('housekeeping_task_image');

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

  getUnitList(){
    return this.unitRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
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

  getIncidentList(){
    return this.incidentRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
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

  getTaskList(){
    return this.taskRef.ref
      .where("branch.id", "==", JSON.parse(String(localStorage.getItem("selected_branch"))).id)
      .orderBy("created_at", "desc")
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

  setTaskItem(id:any, data: any){
    return this.taskItemRef.doc(id).set(data);
  }

  getTaskItem(id: any){
    return this.taskItemRef.doc(id).ref.get();
  }

  getTaskItemList(){
    return this.taskItemRef.ref
      .where("task", "==", sessionStorage.getItem("housekeeping_task_id"))
      .orderBy("created_at", "asc")
      .get();
  }

  getRecurringTaskItemList(){
    return this.taskItemRef.ref
      .where("task", "==", sessionStorage.getItem("housekeeping_task_inspection_id"))
      .orderBy("created_at", "asc")
      .get();
  }

  // task images

  createTaskImage(data: any){
    return this.taskImageRef.add(data);
  }

  updateTaskImage(id:any, data: any){
    return this.taskImageRef.doc(id).update(data);
  }

  deleteTaskImage(id: any){
    return this.taskImageRef.doc(id).delete();
  }

  getTaskImage(id: any){
    return this.taskImageRef.doc(id).ref.get();
  }

  getTaskImageList(){
    return this.taskImageRef.ref
      .where("task", "==", sessionStorage.getItem("housekeeping_task_id"))
      .orderBy("created_at", "asc")
      .get();
  }

  getRecurringTaskImageList(){
    return this.taskImageRef.ref
      .where("task", "==", sessionStorage.getItem("housekeeping_task_id"))
      .orderBy("created_at", "asc")
      .get();
  }

  // image uploads

  uploadTaskImage(images: File[], data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const uploadTasks: Promise<string>[] = [];

      images.forEach((image) => {
        const filePath = `images/housekeeping/task/${Date.now()}_${image.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, image);

        uploadTask
          .then(() => fileRef.getDownloadURL().toPromise())
          .then((downloadUrl) => {
            const dataWithImages = { ...data, url: downloadUrl };
            return this.createTaskImage(dataWithImages);
          })
          .then(() => uploadTasks.push())
          .catch((error) => reject(error));
      });

      // Wait for all upload tasks to complete
      Promise.all(uploadTasks)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

}
