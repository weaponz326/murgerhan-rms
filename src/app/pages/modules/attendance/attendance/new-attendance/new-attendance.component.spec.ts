import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAttendanceComponent } from './new-attendance.component';

describe('NewAttendanceComponent', () => {
  let component: NewAttendanceComponent;
  let fixture: ComponentFixture<NewAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAttendanceComponent]
    });
    fixture = TestBed.createComponent(NewAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
