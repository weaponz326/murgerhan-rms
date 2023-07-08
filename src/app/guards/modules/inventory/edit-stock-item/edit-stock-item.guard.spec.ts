import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { editStockItemGuard } from './edit-stock-item.guard';

describe('editStockItemGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => editStockItemGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
