import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTaskComponent } from './select-task.component';

describe('SelectTaskComponent', () => {
  let component: SelectTaskComponent;
  let fixture: ComponentFixture<SelectTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTaskComponent]
    });
    fixture = TestBed.createComponent(SelectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
