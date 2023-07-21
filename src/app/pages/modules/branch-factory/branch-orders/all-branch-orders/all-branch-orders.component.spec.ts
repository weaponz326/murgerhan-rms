import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBranchOrdersComponent } from './all-branch-orders.component';

describe('AllBranchOrdersComponent', () => {
  let component: AllBranchOrdersComponent;
  let fixture: ComponentFixture<AllBranchOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBranchOrdersComponent]
    });
    fixture = TestBed.createComponent(AllBranchOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
