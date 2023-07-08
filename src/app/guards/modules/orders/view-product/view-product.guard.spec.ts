import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewProductGuard } from './view-product.guard';

describe('viewProductGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewProductGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
