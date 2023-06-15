import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCheckSheetComponent } from './daily-check-sheet.component';

describe('DailyCheckSheetComponent', () => {
  let component: DailyCheckSheetComponent;
  let fixture: ComponentFixture<DailyCheckSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyCheckSheetComponent]
    });
    fixture = TestBed.createComponent(DailyCheckSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
