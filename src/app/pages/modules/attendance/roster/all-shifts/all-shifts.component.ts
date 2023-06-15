import { Component, ViewChild } from '@angular/core';
import { AddShiftComponent } from '../add-shift/add-shift.component';
import { EditShiftComponent } from '../edit-shift/edit-shift.component';

@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.scss']
})
export class AllShiftsComponent {

  @ViewChild('addShiftComponentReference', { read: AddShiftComponent, static: false }) addShift!: AddShiftComponent;
  @ViewChild('editShiftComponentReference', { read: EditShiftComponent, static: false }) editShift!: EditShiftComponent;

}
