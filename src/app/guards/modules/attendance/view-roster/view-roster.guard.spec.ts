import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewRosterGuard } from './view-roster.guard';

describe('viewRosterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewRosterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
