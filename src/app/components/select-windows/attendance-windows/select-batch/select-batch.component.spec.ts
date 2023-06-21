import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBatchComponent } from './select-batch.component';

describe('SelectBatchComponent', () => {
  let component: SelectBatchComponent;
  let fixture: ComponentFixture<SelectBatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBatchComponent]
    });
    fixture = TestBed.createComponent(SelectBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
