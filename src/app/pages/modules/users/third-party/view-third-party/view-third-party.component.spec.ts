import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewThirdPartyComponent } from './view-third-party.component';

describe('ViewThirdPartyComponent', () => {
  let component: ViewThirdPartyComponent;
  let fixture: ComponentFixture<ViewThirdPartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewThirdPartyComponent]
    });
    fixture = TestBed.createComponent(ViewThirdPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
