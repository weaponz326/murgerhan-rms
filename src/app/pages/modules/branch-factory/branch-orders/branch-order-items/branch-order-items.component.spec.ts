import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOrderItemsComponent } from './branch-order-items.component';

describe('BranchOrderItemsComponent', () => {
  let component: BranchOrderItemsComponent;
  let fixture: ComponentFixture<BranchOrderItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchOrderItemsComponent]
    });
    fixture = TestBed.createComponent(BranchOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
