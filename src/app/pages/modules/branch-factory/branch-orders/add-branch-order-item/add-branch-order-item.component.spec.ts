import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchOrderItemComponent } from './add-branch-order-item.component';

describe('AddBranchOrderItemComponent', () => {
  let component: AddBranchOrderItemComponent;
  let fixture: ComponentFixture<AddBranchOrderItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBranchOrderItemComponent]
    });
    fixture = TestBed.createComponent(AddBranchOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
