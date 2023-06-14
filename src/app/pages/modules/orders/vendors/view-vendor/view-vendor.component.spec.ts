import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorComponent } from './view-vendor.component';

describe('ViewVendorComponent', () => {
  let component: ViewVendorComponent;
  let fixture: ComponentFixture<ViewVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVendorComponent]
    });
    fixture = TestBed.createComponent(ViewVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
