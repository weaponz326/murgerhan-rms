import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStockBatchesComponent } from './all-stock-batches.component';

describe('AllStockBatchesComponent', () => {
  let component: AllStockBatchesComponent;
  let fixture: ComponentFixture<AllStockBatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllStockBatchesComponent]
    });
    fixture = TestBed.createComponent(AllStockBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
