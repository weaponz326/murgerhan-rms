import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewPurchasingGuard } from './view-purchasing.guard';

describe('viewPurchasingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewPurchasingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
