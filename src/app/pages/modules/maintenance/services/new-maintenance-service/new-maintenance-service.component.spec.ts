import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaintenanceServiceComponent } from './new-maintenance-service.component';

describe('NewMaintenanceServiceComponent', () => {
  let component: NewMaintenanceServiceComponent;
  let fixture: ComponentFixture<NewMaintenanceServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMaintenanceServiceComponent]
    });
    fixture = TestBed.createComponent(NewMaintenanceServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
