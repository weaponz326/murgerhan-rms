import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorOrderComponent } from './view-vendor-order.component';

describe('ViewVendorOrderComponent', () => {
  let component: ViewVendorOrderComponent;
  let fixture: ComponentFixture<ViewVendorOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVendorOrderComponent]
    });
    fixture = TestBed.createComponent(ViewVendorOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
