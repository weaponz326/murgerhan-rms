import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskScheduleComponent } from './task-schedule.component';

describe('TaskScheduleComponent', () => {
  let component: TaskScheduleComponent;
  let fixture: ComponentFixture<TaskScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskScheduleComponent]
    });
    fixture = TestBed.createComponent(TaskScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
