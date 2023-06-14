import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSheetComponent } from './schedule-sheet.component';

describe('ScheduleSheetComponent', () => {
  let component: ScheduleSheetComponent;
  let fixture: ComponentFixture<ScheduleSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleSheetComponent]
    });
    fixture = TestBed.createComponent(ScheduleSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
