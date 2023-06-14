import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTaskFormComponent } from './schedule-task-form.component';

describe('ScheduleTaskFormComponent', () => {
  let component: ScheduleTaskFormComponent;
  let fixture: ComponentFixture<ScheduleTaskFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleTaskFormComponent]
    });
    fixture = TestBed.createComponent(ScheduleTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
