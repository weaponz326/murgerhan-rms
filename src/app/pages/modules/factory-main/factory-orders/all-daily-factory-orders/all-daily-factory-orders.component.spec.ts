import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDailyFactoryOrdersComponent } from './all-daily-factory-orders.component';

describe('AllDailyFactoryOrdersComponent', () => {
  let component: AllDailyFactoryOrdersComponent;
  let fixture: ComponentFixture<AllDailyFactoryOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDailyFactoryOrdersComponent]
    });
    fixture = TestBed.createComponent(AllDailyFactoryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
