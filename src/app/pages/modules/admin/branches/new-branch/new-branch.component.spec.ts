import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBranchComponent } from './new-branch.component';

describe('NewBranchComponent', () => {
  let component: NewBranchComponent;
  let fixture: ComponentFixture<NewBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBranchComponent]
    });
    fixture = TestBed.createComponent(NewBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
