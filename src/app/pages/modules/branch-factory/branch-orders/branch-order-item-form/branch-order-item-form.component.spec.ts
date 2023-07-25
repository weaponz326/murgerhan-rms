import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOrderItemFormComponent } from './branch-order-item-form.component';

describe('BranchOrderItemFormComponent', () => {
  let component: BranchOrderItemFormComponent;
  let fixture: ComponentFixture<BranchOrderItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchOrderItemFormComponent]
    });
    fixture = TestBed.createComponent(BranchOrderItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
