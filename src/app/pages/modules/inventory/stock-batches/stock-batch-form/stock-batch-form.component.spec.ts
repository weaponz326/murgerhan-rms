import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBatchFormComponent } from './stock-batch-form.component';

describe('StockBatchFormComponent', () => {
  let component: StockBatchFormComponent;
  let fixture: ComponentFixture<StockBatchFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockBatchFormComponent]
    });
    fixture = TestBed.createComponent(StockBatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
