import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonthlyOrderComponent } from './view-monthly-order.component';

describe('ViewMonthlyOrderComponent', () => {
  let component: ViewMonthlyOrderComponent;
  let fixture: ComponentFixture<ViewMonthlyOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMonthlyOrderComponent]
    });
    fixture = TestBed.createComponent(ViewMonthlyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
