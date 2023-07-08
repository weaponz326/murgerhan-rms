import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewAttendanceGuard } from './view-attendance.guard';

describe('viewAttendanceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewAttendanceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
