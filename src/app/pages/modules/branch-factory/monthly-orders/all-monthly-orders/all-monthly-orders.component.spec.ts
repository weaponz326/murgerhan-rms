import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMonthlyOrdersComponent } from './all-monthly-orders.component';

describe('AllMonthlyOrdersComponent', () => {
  let component: AllMonthlyOrdersComponent;
  let fixture: ComponentFixture<AllMonthlyOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMonthlyOrdersComponent]
    });
    fixture = TestBed.createComponent(AllMonthlyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
