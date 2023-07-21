import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFactoryOrderComponent } from './view-factory-order.component';

describe('ViewFactoryOrderComponent', () => {
  let component: ViewFactoryOrderComponent;
  let fixture: ComponentFixture<ViewFactoryOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFactoryOrderComponent]
    });
    fixture = TestBed.createComponent(ViewFactoryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
