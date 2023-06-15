import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePersonnelComponent } from './manage-personnel.component';

describe('ManagePersonnelComponent', () => {
  let component: ManagePersonnelComponent;
  let fixture: ComponentFixture<ManagePersonnelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePersonnelComponent]
    });
    fixture = TestBed.createComponent(ManagePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
