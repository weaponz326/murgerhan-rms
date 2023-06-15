import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractorsComponent } from './edit-contractors.component';

describe('EditContractorsComponent', () => {
  let component: EditContractorsComponent;
  let fixture: ComponentFixture<EditContractorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContractorsComponent]
    });
    fixture = TestBed.createComponent(EditContractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
