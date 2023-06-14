import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInvitationsComponent } from './all-invitations.component';

describe('AllInvitationsComponent', () => {
  let component: AllInvitationsComponent;
  let fixture: ComponentFixture<AllInvitationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllInvitationsComponent]
    });
    fixture = TestBed.createComponent(AllInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
