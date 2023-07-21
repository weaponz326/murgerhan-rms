import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryOrdersPage } from './factory-orders.page';

describe('FactoryOrdersPage', () => {
  let component: FactoryOrdersPage;
  let fixture: ComponentFixture<FactoryOrdersPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactoryOrdersPage]
    });
    fixture = TestBed.createComponent(FactoryOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
