import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContractorsComponent } from './all-contractors.component';

describe('AllContractorsComponent', () => {
  let component: AllContractorsComponent;
  let fixture: ComponentFixture<AllContractorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllContractorsComponent]
    });
    fixture = TestBed.createComponent(AllContractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
