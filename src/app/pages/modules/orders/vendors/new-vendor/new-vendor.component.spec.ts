import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVendorComponent } from './new-vendor.component';

describe('NewVendorComponent', () => {
  let component: NewVendorComponent;
  let fixture: ComponentFixture<NewVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewVendorComponent]
    });
    fixture = TestBed.createComponent(NewVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
