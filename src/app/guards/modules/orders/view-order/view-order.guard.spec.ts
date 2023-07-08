import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewOrderGuard } from './view-order.guard';

describe('viewOrderGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewOrderGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
