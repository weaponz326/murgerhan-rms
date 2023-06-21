import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAttendanceComponent } from './select-attendance.component';

describe('SelectAttendanceComponent', () => {
  let component: SelectAttendanceComponent;
  let fixture: ComponentFixture<SelectAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAttendanceComponent]
    });
    fixture = TestBed.createComponent(SelectAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
