import { TestBed } from '@angular/core/testing';

import { MaintenancePrintService } from './maintenance-print.service';

describe('MaintenancePrintService', () => {
  let service: MaintenancePrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenancePrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
