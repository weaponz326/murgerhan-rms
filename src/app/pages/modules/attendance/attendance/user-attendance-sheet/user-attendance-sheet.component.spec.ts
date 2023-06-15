import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttendanceSheetComponent } from './user-attendance-sheet.component';

describe('UserAttendanceSheetComponent', () => {
  let component: UserAttendanceSheetComponent;
  let fixture: ComponentFixture<UserAttendanceSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAttendanceSheetComponent]
    });
    fixture = TestBed.createComponent(UserAttendanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
