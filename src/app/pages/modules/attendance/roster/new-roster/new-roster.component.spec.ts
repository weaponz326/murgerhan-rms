import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRosterComponent } from './new-roster.component';

describe('NewRosterComponent', () => {
  let component: NewRosterComponent;
  let fixture: ComponentFixture<NewRosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewRosterComponent]
    });
    fixture = TestBed.createComponent(NewRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
