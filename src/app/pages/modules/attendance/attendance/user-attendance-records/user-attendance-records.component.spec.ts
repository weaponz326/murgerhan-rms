import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttendanceRecordsComponent } from './user-attendance-records.component';

describe('UserAttendanceRecordsComponent', () => {
  let component: UserAttendanceRecordsComponent;
  let fixture: ComponentFixture<UserAttendanceRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAttendanceRecordsComponent]
    });
    fixture = TestBed.createComponent(UserAttendanceRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
