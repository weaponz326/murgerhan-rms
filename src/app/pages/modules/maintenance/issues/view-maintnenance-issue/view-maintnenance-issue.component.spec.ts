import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintnenanceIssueComponent } from './view-maintnenance-issue.component';

describe('ViewMaintnenanceIssueComponent', () => {
  let component: ViewMaintnenanceIssueComponent;
  let fixture: ComponentFixture<ViewMaintnenanceIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMaintnenanceIssueComponent]
    });
    fixture = TestBed.createComponent(ViewMaintnenanceIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
