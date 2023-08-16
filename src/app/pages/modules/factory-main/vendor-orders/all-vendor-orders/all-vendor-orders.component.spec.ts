import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVendorOrdersComponent } from './all-vendor-orders.component';

describe('AllVendorOrdersComponent', () => {
  let component: AllVendorOrdersComponent;
  let fixture: ComponentFixture<AllVendorOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllVendorOrdersComponent]
    });
    fixture = TestBed.createComponent(AllVendorOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
