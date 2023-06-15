import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaintnenanceIssueComponent } from './new-maintnenance-issue.component';

describe('NewMaintnenanceIssueComponent', () => {
  let component: NewMaintnenanceIssueComponent;
  let fixture: ComponentFixture<NewMaintnenanceIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMaintnenanceIssueComponent]
    });
    fixture = TestBed.createComponent(NewMaintnenanceIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
