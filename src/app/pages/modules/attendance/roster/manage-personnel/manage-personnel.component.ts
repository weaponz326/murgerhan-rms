import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';

import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddPersonnelComponent } from '../add-personnel/add-personnel.component';
import { EditPersonnelComponent } from '../edit-personnel/edit-personnel.component';


@Component({
  selector: 'app-manage-personnel',
  templateUrl: './manage-personnel.component.html',
  styleUrls: ['./manage-personnel.component.scss']
})
export class ManagePersonnelComponent {
  
  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addPersonnelComponentReference', { read: AddPersonnelComponent, static: false }) addPersonnel!: AddPersonnelComponent;
  @ViewChild('editPersonnelComponentReference', { read: EditPersonnelComponent, static: false }) editPersonnel!: EditPersonnelComponent;
  
  rosterPersonnelListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  ngOnInit(): void {
    this.getRosterPersonnelList();
  }

  getRosterPersonnelList(){
    this.isFetchingData = true;

    this.attendanceApi.getRosterPersonnelList()
      .then(
        (res: any) => {
          // console.log(res);
          this.rosterPersonnelListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createRosterPersonnel(data: any) {
    this.addPersonnel.isItemSaving = true;

    // console.log(data);

    this.attendanceApi.createRosterPersonnel(data)
      .then((res: any) => {
        // console.log(res);

        if(res.id){
          this.getRosterPersonnelList();

          this.addPersonnel.isItemSaving = false;
          this.addPersonnel.dismissButton.nativeElement.click();
          this.addPersonnel.resetForm();
        }
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.addPersonnel.isItemSaving = false;
      });
  }

  updateRosterPersonnel(rosterpersonnel_item: any) {
    this.editPersonnel.isItemSaving = true;
    
    const id = sessionStorage.getItem('attendance_roster_personnel_id') as string;

    this.attendanceApi.updateRosterPersonnel(rosterpersonnel_item.id, rosterpersonnel_item.data)
      .then((res) => {
        // console.log(res);
        this.editPersonnel.isItemSaving = false;
        this.editPersonnel.dismissButton.nativeElement.click();
        this.getRosterPersonnelList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.editPersonnel.isItemSaving = false;
      });
  }

  deleteRosterPersonnel() {
    this.isItemDeleting = true;

    this.attendanceApi.deleteRosterPersonnel(this.deleteId)
      .then((res) => {
        // console.log(res);
        this.isItemDeleting = false;
        this.getRosterPersonnelList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  openEditItem(data: any){
    // console.log(data);
    this.editPersonnel.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
