import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShiftComponent } from './select-shift.component';

describe('SelectShiftComponent', () => {
  let component: SelectShiftComponent;
  let fixture: ComponentFixture<SelectShiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectShiftComponent]
    });
    fixture = TestBed.createComponent(SelectShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
