import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDailyFactoryOrderComponent } from './view-daily-factory-order.component';

describe('ViewDailyFactoryOrderComponent', () => {
  let component: ViewDailyFactoryOrderComponent;
  let fixture: ComponentFixture<ViewDailyFactoryOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDailyFactoryOrderComponent]
    });
    fixture = TestBed.createComponent(ViewDailyFactoryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
