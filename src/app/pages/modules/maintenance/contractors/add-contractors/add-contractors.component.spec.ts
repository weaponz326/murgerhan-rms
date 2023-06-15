import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractorsComponent } from './add-contractors.component';

describe('AddContractorsComponent', () => {
  let component: AddContractorsComponent;
  let fixture: ComponentFixture<AddContractorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContractorsComponent]
    });
    fixture = TestBed.createComponent(AddContractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
