import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOrdersPage } from './branch-orders.page';

describe('BranchOrdersPage', () => {
  let component: BranchOrdersPage;
  let fixture: ComponentFixture<BranchOrdersPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchOrdersPage]
    });
    fixture = TestBed.createComponent(BranchOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
