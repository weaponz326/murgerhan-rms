import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorHistoryComponent } from './contractor-history.component';

describe('ContractorHistoryComponent', () => {
  let component: ContractorHistoryComponent;
  let fixture: ComponentFixture<ContractorHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractorHistoryComponent]
    });
    fixture = TestBed.createComponent(ContractorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
