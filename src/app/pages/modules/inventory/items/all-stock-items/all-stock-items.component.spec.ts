import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStockItemsComponent } from './all-stock-items.component';

describe('AllStockItemsComponent', () => {
  let component: AllStockItemsComponent;
  let fixture: ComponentFixture<AllStockItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllStockItemsComponent]
    });
    fixture = TestBed.createComponent(AllStockItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
