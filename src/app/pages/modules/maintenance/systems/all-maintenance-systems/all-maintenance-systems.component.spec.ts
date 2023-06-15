import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceSystemsComponent } from './all-maintenance-systems.component';

describe('AllMaintenanceSystemsComponent', () => {
  let component: AllMaintenanceSystemsComponent;
  let fixture: ComponentFixture<AllMaintenanceSystemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMaintenanceSystemsComponent]
    });
    fixture = TestBed.createComponent(AllMaintenanceSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
