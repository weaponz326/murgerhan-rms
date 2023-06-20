import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';

import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddShiftComponent } from '../add-shift/add-shift.component';
import { EditShiftComponent } from '../edit-shift/edit-shift.component';


@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.scss']
})
export class AllShiftsComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addShiftComponentReference', { read: AddShiftComponent, static: false }) addShift!: AddShiftComponent;
  @ViewChild('editShiftComponentReference', { read: EditShiftComponent, static: false }) editShift!: EditShiftComponent;
  
  rosterShiftListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  ngOnInit(): void {
    this.getRosterShiftList();
  }

  getRosterShiftList(){
    this.isFetchingData = true;

    this.attendanceApi.getRosterShiftList()
      .then(
        (res: any) => {
          console.log(res);
          this.rosterShiftListData = res;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createRosterShift(data: any) {
    this.addShift.isItemSaving = true;

    console.log(data);

    this.attendanceApi.createRosterShift(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          this.getRosterShiftList();

          this.addShift.isItemSaving = false;
          this.addShift.dismissButton.nativeElement.click();
          this.addShift.resetForm();
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.addShift.isItemSaving = false;
      });
  }

  updateRosterShift(rostershift_item: any) {
    this.editShift.isItemSaving = true;
    
    const id = sessionStorage.getItem('attendance_rostershift_id') as string;

    this.attendanceApi.updateRosterShift(rostershift_item.id, rostershift_item.data)
      .then((res) => {
        console.log(res);
        this.editShift.isItemSaving = false;
        this.editShift.dismissButton.nativeElement.click();
        this.getRosterShiftList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.editShift.isItemSaving = false;
      });
  }

  deleteRosterShift() {
    this.isItemDeleting = true;

    this.attendanceApi.deleteRosterShift(this.deleteId)
      .then((res) => {
        console.log(res);
        this.isItemDeleting = false;
        this.getRosterShiftList();
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  openEditItem(data: any){
    console.log(data);
    this.editShift.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }
  
}
