import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationConfigurationComponent } from './invitation-configuration.component';

describe('InvitationConfigurationComponent', () => {
  let component: InvitationConfigurationComponent;
  let fixture: ComponentFixture<InvitationConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationConfigurationComponent]
    });
    fixture = TestBed.createComponent(InvitationConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
