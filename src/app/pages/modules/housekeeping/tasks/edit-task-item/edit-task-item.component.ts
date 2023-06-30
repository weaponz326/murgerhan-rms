import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { TaskItem } from 'src/app/models/modules/housekeeping/housekeeping.model';

import { TaskItemFormComponent } from '../task-item-form/task-item-form.component';
import { SelectUnitComponent } from 'src/app/components/select-windows/housekeeping-windows/select-unit/select-unit.component';


@Component({
  selector: 'app-edit-task-item',
  templateUrl: './edit-task-item.component.html',
  styleUrls: ['./edit-task-item.component.scss']
})
export class EditTaskItemComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('taskItemFormComponentReference', { read: TaskItemFormComponent, static: false }) taskItemForm!: TaskItemFormComponent;
  @ViewChild('selectUnitComponentReference', { read: SelectUnitComponent, static: false }) selectUnit!: SelectUnitComponent;

  taskItemData: any;
  
  selectedUnitId: any;
  selectedUnitData: any;

  isItemSaving = false;

  openModal(data: any){
    this.taskItemData = data;
    this.setTaskItemData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let unitData = {
      id: "",
      data: {
        unit_code: "",
        unit_name: "",
      }
    };

    if(this.selectedUnitId){
      unitData = {
        id: this.selectedUnitId,
        data: {
          unit_code: this.selectedUnitData.unit_code,
          unit_name: this.selectedUnitData.unit_name,
        }
      }
    }

    let data: TaskItem = {
      created_at: this.taskItemData.data().created_at,
      updated_at: serverTimestamp(),
      item_number: this.taskItemForm.taskItemForm.controls.itemNumber.value as number,
      task: sessionStorage.getItem('housekeeping_task_id') as string,
      task_description: this.taskItemForm.taskItemForm.controls.taskDescription.value as string,
      item_status: this.taskItemData.data().task_status,
      unit: unitData
    }

    let item = {
      id: this.taskItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  setTaskItemData(data: any){
    this.taskItemForm.taskItemForm.controls.itemNumber.setValue(data.data().item_number);
    this.taskItemForm.taskItemForm.controls.taskDescription.setValue(data.data().task_description);
    this.taskItemForm.taskItemForm.controls.unitName.setValue(data.data().unit?.data.unit_name);
    this.selectedUnitId = data.data().unit.id;
    this.selectedUnitData = data.data().unit.data;
  }
  
  openUnitWindow(){
    console.log("You are opening select unit window")
    this.selectUnit.openModal();
  }

  onUnitSelected(unitData: any){
    console.log(unitData);
    this.taskItemForm.taskItemForm.controls.unitName.setValue(unitData.data().unit_name);
    this.selectedUnitId = unitData.id;
    this.selectedUnitData = unitData.data();
  }
  
}
