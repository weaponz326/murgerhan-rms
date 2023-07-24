import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockBatchComponent } from './add-stock-batch.component';

describe('AddStockBatchComponent', () => {
  let component: AddStockBatchComponent;
  let fixture: ComponentFixture<AddStockBatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStockBatchComponent]
    });
    fixture = TestBed.createComponent(AddStockBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
