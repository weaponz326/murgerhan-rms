import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBatchesPage } from './stock-batches.page';

describe('StockBatchesPage', () => {
  let component: StockBatchesPage;
  let fixture: ComponentFixture<StockBatchesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockBatchesPage]
    });
    fixture = TestBed.createComponent(StockBatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
