import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsPage } from './invitations.page';

describe('InvitationsPage', () => {
  let component: InvitationsPage;
  let fixture: ComponentFixture<InvitationsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationsPage]
    });
    fixture = TestBed.createComponent(InvitationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
