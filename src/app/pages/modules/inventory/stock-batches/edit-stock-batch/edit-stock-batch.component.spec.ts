import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockBatchComponent } from './edit-stock-batch.component';

describe('EditStockBatchComponent', () => {
  let component: EditStockBatchComponent;
  let fixture: ComponentFixture<EditStockBatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStockBatchComponent]
    });
    fixture = TestBed.createComponent(EditStockBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
