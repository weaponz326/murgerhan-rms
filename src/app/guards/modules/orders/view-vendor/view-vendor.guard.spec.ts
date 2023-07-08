import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewVendorGuard } from './view-vendor.guard';

describe('viewVendorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewVendorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
