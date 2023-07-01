import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';

import { RosterPersonnel } from 'src/app/models/modules/attendance/attendance.model';

import { PersonnelFormComponent } from '../personnel-form/personnel-form.component';
import { SelectUserRoleComponent } from 'src/app/components/select-windows/users-windows/select-user-role/select-user-role.component';
import { SelectBatchComponent } from 'src/app/components/select-windows/attendance-windows/select-batch/select-batch.component';


@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss']
})
export class AddPersonnelComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('personnelFormComponentReference', { read: PersonnelFormComponent, static: false }) personnelForm!: PersonnelFormComponent;
  @ViewChild('selectBatchComponentReference', { read: SelectBatchComponent, static: false }) selectBatch!: SelectBatchComponent;
  @ViewChild('selectUserRoleComponentReference', { read: SelectUserRoleComponent, static: false }) selectUserRole!: SelectUserRoleComponent;

  isItemSaving = false;

  selectedBatchId: any;
  selectedBatchData: any;  
  selectedUserRoleId: any;
  selectedUserRoleData: any;
    
  openModal(){
    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data: RosterPersonnel = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      roster: sessionStorage.getItem('attendance_roster_id') as string,
      personnel: {
        id: this.selectedUserRoleId,
        data: {
          staff_code: this.selectedUserRoleData.staff_code,
          full_name: this.selectedUserRoleData.full_name,
          staff_role: this.selectedUserRoleData.staff_role,
        }
      },
      batch: {
        id: this.selectedBatchId,
        data: {
          batch_name: this.selectedBatchData.batch_name,
          batch_symbol: this.selectedBatchData.batch_symbol,
        }
      },
    }

    if(this.personnelForm.personnelForm.valid)
      this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.personnelForm.personnelForm.controls.staffCode.setValue('');
    this.personnelForm.personnelForm.controls.fullName.setValue('');
    this.personnelForm.personnelForm.controls.batchSymbol.setValue('');

    this.selectedBatchData = null;
    this.selectedUserRoleData = null;
  }

  openBatchWindow(){
    console.log("You are opening select batch window")
    this.selectBatch.openModal();
  }

  onBatchSelected(batchData: any){
    console.log(batchData);

    this.personnelForm.personnelForm.controls.batchSymbol.setValue(batchData.data().batch_symbol);
    this.selectedBatchId = batchData.id;
    this.selectedBatchData = batchData.data();
  }

  openUserRoleWindow(){
    console.log("You are opening select user role window")
    this.selectUserRole.openModal();
  }

  onUserRoleSelected(userRoleData: any){
    console.log(userRoleData);
    this.selectedUserRoleData = userRoleData;
    this.personnelForm.personnelForm.controls.staffCode.setValue(userRoleData.data().staff_code);
    this.personnelForm.personnelForm.controls.fullName.setValue(userRoleData.data().full_name);

    this.selectedUserRoleId = userRoleData.id;
    this.selectedUserRoleData = userRoleData.data();
  }

}
