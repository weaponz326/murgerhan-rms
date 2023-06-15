import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterSheetComponent } from './roster-sheet.component';

describe('RosterSheetComponent', () => {
  let component: RosterSheetComponent;
  let fixture: ComponentFixture<RosterSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RosterSheetComponent]
    });
    fixture = TestBed.createComponent(RosterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
