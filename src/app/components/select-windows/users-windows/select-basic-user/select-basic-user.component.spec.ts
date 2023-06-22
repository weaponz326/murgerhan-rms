import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBasicUserComponent } from './select-basic-user.component';

describe('SelectBasicUserComponent', () => {
  let component: SelectBasicUserComponent;
  let fixture: ComponentFixture<SelectBasicUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBasicUserComponent]
    });
    fixture = TestBed.createComponent(SelectBasicUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
