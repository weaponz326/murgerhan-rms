import { Component, ViewChild } from '@angular/core';
import { NewAttendanceComponent } from '../new-attendance/new-attendance.component';

@Component({
  selector: 'app-all-attendance',
  templateUrl: './all-attendance.component.html',
  styleUrls: ['./all-attendance.component.scss']
})
export class AllAttendanceComponent {

  @ViewChild('newAttendanceComponentReference', { read: NewAttendanceComponent, static: false }) newAttendance!: NewAttendanceComponent;

}
