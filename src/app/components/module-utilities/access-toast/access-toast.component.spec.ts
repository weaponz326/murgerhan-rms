import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessToastComponent } from './access-toast.component';

describe('AccessToastComponent', () => {
  let component: AccessToastComponent;
  let fixture: ComponentFixture<AccessToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessToastComponent]
    });
    fixture = TestBed.createComponent(AccessToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
