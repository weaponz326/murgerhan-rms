import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVendorComponent } from './select-vendor.component';

describe('SelectVendorComponent', () => {
  let component: SelectVendorComponent;
  let fixture: ComponentFixture<SelectVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectVendorComponent]
    });
    fixture = TestBed.createComponent(SelectVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
