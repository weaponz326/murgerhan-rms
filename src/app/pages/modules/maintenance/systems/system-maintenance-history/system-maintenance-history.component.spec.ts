import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMaintenanceHistoryComponent } from './system-maintenance-history.component';

describe('SystemMaintenanceHistoryComponent', () => {
  let component: SystemMaintenanceHistoryComponent;
  let fixture: ComponentFixture<SystemMaintenanceHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemMaintenanceHistoryComponent]
    });
    fixture = TestBed.createComponent(SystemMaintenanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
