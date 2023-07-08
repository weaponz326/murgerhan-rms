import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewIncidentGuard } from './view-incident.guard';

describe('viewIncidentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewIncidentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
