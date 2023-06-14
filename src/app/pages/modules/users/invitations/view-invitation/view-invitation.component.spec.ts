import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvitationComponent } from './view-invitation.component';

describe('ViewInvitationComponent', () => {
  let component: ViewInvitationComponent;
  let fixture: ComponentFixture<ViewInvitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInvitationComponent]
    });
    fixture = TestBed.createComponent(ViewInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
