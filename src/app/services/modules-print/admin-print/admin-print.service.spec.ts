import { TestBed } from '@angular/core/testing';

import { AdminPrintService } from './admin-print.service';

describe('AdminPrintService', () => {
  let service: AdminPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
