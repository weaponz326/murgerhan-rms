import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaintenanceSystemComponent } from './new-maintenance-system.component';

describe('NewMaintenanceSystemComponent', () => {
  let component: NewMaintenanceSystemComponent;
  let fixture: ComponentFixture<NewMaintenanceSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMaintenanceSystemComponent]
    });
    fixture = TestBed.createComponent(NewMaintenanceSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
