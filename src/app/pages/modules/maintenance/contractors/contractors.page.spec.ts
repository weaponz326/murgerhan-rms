import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorsPage } from './contractors.page';

describe('ContractorsPage', () => {
  let component: ContractorsPage;
  let fixture: ComponentFixture<ContractorsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractorsPage]
    });
    fixture = TestBed.createComponent(ContractorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
