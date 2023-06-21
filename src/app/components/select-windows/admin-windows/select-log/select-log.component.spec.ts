import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLogComponent } from './select-log.component';

describe('SelectLogComponent', () => {
  let component: SelectLogComponent;
  let fixture: ComponentFixture<SelectLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectLogComponent]
    });
    fixture = TestBed.createComponent(SelectLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
