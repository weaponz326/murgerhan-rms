import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAttendanceRecordsComponent } from './day-attendance-records.component';

describe('DayAttendanceRecordsComponent', () => {
  let component: DayAttendanceRecordsComponent;
  let fixture: ComponentFixture<DayAttendanceRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayAttendanceRecordsComponent]
    });
    fixture = TestBed.createComponent(DayAttendanceRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
