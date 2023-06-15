import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAttendanceSheetComponent } from './general-attendance-sheet.component';

describe('GeneralAttendanceSheetComponent', () => {
  let component: GeneralAttendanceSheetComponent;
  let fixture: ComponentFixture<GeneralAttendanceSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralAttendanceSheetComponent]
    });
    fixture = TestBed.createComponent(GeneralAttendanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
