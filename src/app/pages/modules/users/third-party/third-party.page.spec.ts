import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyPage } from './third-party.page';

describe('ThirdPartyPage', () => {
  let component: ThirdPartyPage;
  let fixture: ComponentFixture<ThirdPartyPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdPartyPage]
    });
    fixture = TestBed.createComponent(ThirdPartyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
