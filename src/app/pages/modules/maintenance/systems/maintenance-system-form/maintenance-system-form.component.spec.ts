import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceSystemFormComponent } from './maintenance-system-form.component';

describe('MaintenanceSystemFormComponent', () => {
  let component: MaintenanceSystemFormComponent;
  let fixture: ComponentFixture<MaintenanceSystemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceSystemFormComponent]
    });
    fixture = TestBed.createComponent(MaintenanceSystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
