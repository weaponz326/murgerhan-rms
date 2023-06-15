import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceIssueFormComponent } from './maintenance-issue-form.component';

describe('MaintenanceIssueFormComponent', () => {
  let component: MaintenanceIssueFormComponent;
  let fixture: ComponentFixture<MaintenanceIssueFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceIssueFormComponent]
    });
    fixture = TestBed.createComponent(MaintenanceIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
