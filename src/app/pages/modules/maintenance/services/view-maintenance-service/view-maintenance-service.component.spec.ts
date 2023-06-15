import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintenanceServiceComponent } from './view-maintenance-service.component';

describe('ViewMaintenanceServiceComponent', () => {
  let component: ViewMaintenanceServiceComponent;
  let fixture: ComponentFixture<ViewMaintenanceServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMaintenanceServiceComponent]
    });
    fixture = TestBed.createComponent(ViewMaintenanceServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
