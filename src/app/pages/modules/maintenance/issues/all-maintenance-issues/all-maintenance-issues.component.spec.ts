import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceIssuesComponent } from './all-maintenance-issues.component';

describe('AllMaintenanceIssuesComponent', () => {
  let component: AllMaintenanceIssuesComponent;
  let fixture: ComponentFixture<AllMaintenanceIssuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMaintenanceIssuesComponent]
    });
    fixture = TestBed.createComponent(AllMaintenanceIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
