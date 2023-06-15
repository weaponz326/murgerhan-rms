import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintenanceSystemComponent } from './view-maintenance-system.component';

describe('ViewMaintenanceSystemComponent', () => {
  let component: ViewMaintenanceSystemComponent;
  let fixture: ComponentFixture<ViewMaintenanceSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMaintenanceSystemComponent]
    });
    fixture = TestBed.createComponent(ViewMaintenanceSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
