import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInvitationComponent } from './select-invitation.component';

describe('SelectInvitationComponent', () => {
  let component: SelectInvitationComponent;
  let fixture: ComponentFixture<SelectInvitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectInvitationComponent]
    });
    fixture = TestBed.createComponent(SelectInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
