import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttendanceHistoryComponent } from './staff-attendance-history.component';

describe('StaffAttendanceHistoryComponent', () => {
  let component: StaffAttendanceHistoryComponent;
  let fixture: ComponentFixture<StaffAttendanceHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffAttendanceHistoryComponent]
    });
    fixture = TestBed.createComponent(StaffAttendanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
