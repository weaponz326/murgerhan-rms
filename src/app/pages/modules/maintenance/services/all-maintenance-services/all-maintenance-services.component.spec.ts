import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceServicesComponent } from './all-maintenance-services.component';

describe('AllMaintenanceServicesComponent', () => {
  let component: AllMaintenanceServicesComponent;
  let fixture: ComponentFixture<AllMaintenanceServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMaintenanceServicesComponent]
    });
    fixture = TestBed.createComponent(AllMaintenanceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
