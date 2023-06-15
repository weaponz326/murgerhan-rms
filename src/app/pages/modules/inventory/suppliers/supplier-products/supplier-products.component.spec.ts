import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductsComponent } from './supplier-products.component';

describe('SupplierProductsComponent', () => {
  let component: SupplierProductsComponent;
  let fixture: ComponentFixture<SupplierProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierProductsComponent]
    });
    fixture = TestBed.createComponent(SupplierProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
