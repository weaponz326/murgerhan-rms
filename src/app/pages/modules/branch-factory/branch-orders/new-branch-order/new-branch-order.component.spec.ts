import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBranchOrderComponent } from './new-branch-order.component';

describe('NewBranchOrderComponent', () => {
  let component: NewBranchOrderComponent;
  let fixture: ComponentFixture<NewBranchOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBranchOrderComponent]
    });
    fixture = TestBed.createComponent(NewBranchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
