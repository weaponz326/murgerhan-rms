import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logDetailsGuard } from './log-details.guard';

describe('logDetailsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logDetailsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
