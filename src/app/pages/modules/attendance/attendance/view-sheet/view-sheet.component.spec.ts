import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSheetComponent } from './view-sheet.component';

describe('ViewSheetComponent', () => {
  let component: ViewSheetComponent;
  let fixture: ComponentFixture<ViewSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSheetComponent]
    });
    fixture = TestBed.createComponent(ViewSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
