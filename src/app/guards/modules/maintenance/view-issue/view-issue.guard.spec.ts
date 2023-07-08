import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewIssueGuard } from './view-issue.guard';

describe('viewIssueGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewIssueGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
