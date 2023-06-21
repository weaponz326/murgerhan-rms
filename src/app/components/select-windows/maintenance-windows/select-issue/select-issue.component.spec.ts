import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIssueComponent } from './select-issue.component';

describe('SelectIssueComponent', () => {
  let component: SelectIssueComponent;
  let fixture: ComponentFixture<SelectIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectIssueComponent]
    });
    fixture = TestBed.createComponent(SelectIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
