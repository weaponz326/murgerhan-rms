import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBranchOrderItemComponent } from './edit-branch-order-item.component';

describe('EditBranchOrderItemComponent', () => {
  let component: EditBranchOrderItemComponent;
  let fixture: ComponentFixture<EditBranchOrderItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBranchOrderItemComponent]
    });
    fixture = TestBed.createComponent(EditBranchOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
