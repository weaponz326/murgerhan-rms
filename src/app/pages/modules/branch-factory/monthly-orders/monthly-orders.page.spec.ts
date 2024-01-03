import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyOrdersPage } from './monthly-orders.page';

describe('MonthlyOrdersPage', () => {
  let component: MonthlyOrdersPage;
  let fixture: ComponentFixture<MonthlyOrdersPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyOrdersPage]
    });
    fixture = TestBed.createComponent(MonthlyOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
