import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOrderItemsComponent } from './vendor-order-items.component';

describe('VendorOrderItemsComponent', () => {
  let component: VendorOrderItemsComponent;
  let fixture: ComponentFixture<VendorOrderItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorOrderItemsComponent]
    });
    fixture = TestBed.createComponent(VendorOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
