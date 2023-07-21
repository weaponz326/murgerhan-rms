import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBranchOrderComponent } from './view-branch-order.component';

describe('ViewBranchOrderComponent', () => {
  let component: ViewBranchOrderComponent;
  let fixture: ComponentFixture<ViewBranchOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBranchOrderComponent]
    });
    fixture = TestBed.createComponent(ViewBranchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
