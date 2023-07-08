import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewContractorGuard } from './view-contractor.guard';

describe('viewContractorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewContractorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
