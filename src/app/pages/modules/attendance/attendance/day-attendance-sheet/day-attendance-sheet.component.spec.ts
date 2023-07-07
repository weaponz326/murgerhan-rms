import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAttendanceSheetComponent } from './day-attendance-sheet.component';

describe('DayAttendanceSheetComponent', () => {
  let component: DayAttendanceSheetComponent;
  let fixture: ComponentFixture<DayAttendanceSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayAttendanceSheetComponent]
    });
    fixture = TestBed.createComponent(DayAttendanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
