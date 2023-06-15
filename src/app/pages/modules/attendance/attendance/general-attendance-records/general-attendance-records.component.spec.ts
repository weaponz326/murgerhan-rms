import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAttendanceRecordsComponent } from './general-attendance-records.component';

describe('GeneralAttendanceRecordsComponent', () => {
  let component: GeneralAttendanceRecordsComponent;
  let fixture: ComponentFixture<GeneralAttendanceRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralAttendanceRecordsComponent]
    });
    fixture = TestBed.createComponent(GeneralAttendanceRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
