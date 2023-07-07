import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePersonnelComponent } from './attendance-personnel.component';

describe('AttendancePersonnelComponent', () => {
  let component: AttendancePersonnelComponent;
  let fixture: ComponentFixture<AttendancePersonnelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendancePersonnelComponent]
    });
    fixture = TestBed.createComponent(AttendancePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
