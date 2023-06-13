import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicProfileComponent } from './basic-profile.component';

describe('BasicProfileComponent', () => {
  let component: BasicProfileComponent;
  let fixture: ComponentFixture<BasicProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicProfileComponent]
    });
    fixture = TestBed.createComponent(BasicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
