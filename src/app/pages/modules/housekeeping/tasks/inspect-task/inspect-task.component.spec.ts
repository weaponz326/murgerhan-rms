import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectTaskComponent } from './inspect-task.component';

describe('InspectTaskComponent', () => {
  let component: InspectTaskComponent;
  let fixture: ComponentFixture<InspectTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectTaskComponent]
    });
    fixture = TestBed.createComponent(InspectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
