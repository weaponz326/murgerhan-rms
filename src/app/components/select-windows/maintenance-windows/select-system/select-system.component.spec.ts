import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSystemComponent } from './select-system.component';

describe('SelectSystemComponent', () => {
  let component: SelectSystemComponent;
  let fixture: ComponentFixture<SelectSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectSystemComponent]
    });
    fixture = TestBed.createComponent(SelectSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
