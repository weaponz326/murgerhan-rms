import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFactoryOrdersComponent } from './all-factory-orders.component';

describe('AllFactoryOrdersComponent', () => {
  let component: AllFactoryOrdersComponent;
  let fixture: ComponentFixture<AllFactoryOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllFactoryOrdersComponent]
    });
    fixture = TestBed.createComponent(AllFactoryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
